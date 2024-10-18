import React from 'react';
import { Search, Users, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header = ({ searchTerm, setSearchTerm }: HeaderProps) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between gap-4 md:gap-8">
          {/* Logo and Title */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="shadow-sm p-2 rounded-lg">
              <img src="./favicon.png" alt="Website Logo" className='h-10 w-10' />
            </div>
            <h1 className="font-extrabold text-blue-600 text-lg md:text-2xl">User Management</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Search Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[calc(100vw-2rem)] sm:w-80">
                <div className="p-2">
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;