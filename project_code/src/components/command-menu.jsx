import React from 'react';
import Link from 'next/link';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);
  
    React.useEffect(() => {
      function handleKeyDown(e) {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen(prevOpen => !prevOpen);
        } else if (open && e.key === "Enter") {
          // Handle Enter key press on CommandItem
          const selectedItem = document.querySelector('.CommandItem:focus');
          if (selectedItem) {
            selectedItem.click(); // Simulate click on focused item
            setOpen(false); // Close the dialog after selection
          }
        }
      }
  
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const commands = [
      { name: 'About', url: '/about' },
      { name: 'Dashboard', url: '/dashboard' },
      { name: 'Orders', url: '/orders' },
      { name: 'Inventory', url: '/inventory' },
      { name: 'Settings', url: '/settings' }
    ];

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {commands.map(command => (
                <Link key={command.name} href={command.url} passHref>
                  <CommandItem tabIndex={0}> {/* Set tabIndex for focus */}
                    {command.name}
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      );
    }