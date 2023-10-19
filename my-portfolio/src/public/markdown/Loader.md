# Loader

Software loader excluding access from non-paying users or users without an account. Disallow the ability to crack / pirate software. This is a full stack application with an API, Nextjs React admin panel using Tailwind CSS, Sql database with locking, and finally, a C++ client is all used.

- Sqlite database containing users, invites, hwid, dll information, cookies, and banned IPs.
- Discord bot to easily and quickly perform actions without logging in to the admin panel.
- Imports done server-side
- Relocs done server-side
- TLS_AES_256_GCM_SHA384 encryption
- Hardware ID check
- Dynamic usage

![Alt Text](https://cdn.discordapp.com/attachments/1051656181099266049/1163453398683766844/f2yhwn.gif?ex=653fa16a&is=652d2c6a&hm=de7a933536b224bb898c458f87aed089914687f8b014439b421bd32a9389dfd0&)

## Basic Explanation

Typically when injecting DLL's you will just let Windows handle it. Get the handle, get the path to the DLL, load the library, and boom done! The issue with this is Windows puts that information up for display. Allowing bad actors to gain information and attack your program. Or even easier, just take your Dll and use it whenever they want ever they want.

![Alt Text](https://cdn.discordapp.com/attachments/1051656181099266049/1163455864104034354/image.png?ex=653fa3b5&is=652d2eb5&hm=b4f83686c9622aa92058b0863d1c645b93ebcb17e681065a2b43aa9b2a60e6b4&)

Load library automatically does reallocation, so once someone has your Dll they can just use Load Library to use it since it will just do reallocation again! That's when we introduce something called "manual mapping". All that manual mapping does is not rely on Windows to load our binary. We **manually** go through the sections of the PE Table and modify them with the proper reallocation. We are doing reallocation, we are finding the import addresses, and we are loading not found imports.

Okay, so what? We just manual map on a client and boom we can't get cracked! Well not exactly... most manual mapping is done through shell code only through a client leaving a similar problem with manual mapping. If someone just gets the address of your binary, gets the size, and dumps it that shell code will just do reallocations and nicely fix it up for the bad actor.

This is where we throw our server into the mix. Making our server calculate the reallocations, imports, sections, exports, and other parts and hardcode those values in the Dlls makes it so if the program closes and re-opens... well that Dll is useless! None of the addresses will be right and therefore won't run.

```cpp
// walk relocations
auto reloc_dir = directory<undocumented::relocation_data_t (IMAGE_DIRECTORY_ENTRY_BASERELOC);

while (reloc_dir->page_rva) {
    if (reloc_dir->block_size >= 8) {
        const auto count = reloc_dir->count();
        const auto list = (uint16_t*)((uint8_t*)reloc_dir + 0x8);

        for (auto i = 0u; i < count; i++) {
            const auto reloc = reloc_dir->item[i];

            const auto type = reloc.type;
            const auto offset = reloc.offset;
            const auto relocation = (uintptr_t*)(mapped_buf + reloc_dir->page_rva + offset);
            if (type == 0)
                continue;

            *relocation -= nt()->OptionalHeader.ImageBase;

            //The rest of the code has been cut since this is a closed-source application
        }
    }
}
```

While all of this is happening the client is also performing anti-debugging, anti-dumping, anti-virtual machine, packed, and other protections. If the client detects one of the modules from the "security thread" it alerts the server and promptly bans that user's IP, hwid, and user in general. The reason and information about the client are logged on the server. If the client attempts to log in while banned they are relayed a ban message (which can be customized).
## Client Server Communication

The client and server start with a TLS SSL handshake. Once this is done the user tells the server their login information, once the server says it's okay the client sends identifiers about its hardware (this is so the software is locked to that user's machine only). The server then sends the process and names of imports, and the client sends back the address of the imports and if they are a part of the Apiset as well as the base address for the process and other information. The server fixes the Dll, ships it to the client, and the client writes all the bytes to the process, then creates a thread to start the program.

## Server Backend

While all of this is happening the server is checking the database for a couple of things. The user's username, hwid, IP address, what software they have access to, and when do their subscriptions end for each software.

All of this information can be accessed through the API which is hosted by the server. Each request needs a session cookie assorted. This cookie is compared to a cookie table in the database, if requests made that can only be accessed by admins aren't the request is denied. Cookies also have an expiration time, this time is set whenever an admin or user logs in.

Because of this API, we can display this information with the help of a React site. Using Nextjs we host a react site styled with Tailwind CSS.

![Alt Text](https://cdn.discordapp.com/attachments/1051656181099266049/1163464727586947142/12lhid_1.gif?ex=653fabf7&is=652d36f7&hm=ad358c9bbf4be91c4eabd539570ca227aef1cb122f797c621401360cbf61f803&)

## Conclusion

This Software Loader uses Windows PE Header magic, manual mapping, and anti-debugging to disallow the ability to crack programs being sold via a subscription model. The server handles all subscriptions while also hosting an API allowing an admin panel to be created using React.



