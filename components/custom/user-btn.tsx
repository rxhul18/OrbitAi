import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  IconApi,
  IconBrandGithub,
  IconBrandGithubCopilot,
  IconCirclesRelation,
  IconHeartHandshake,
  IconLogout,
  IconSettingsCode,
} from "@tabler/icons-react";
import Link from "next/link";
// import { MyLinks } from "@/db/defaults";
import { createClient } from "@/db/supabase/client";
import { useAuth } from "@/context/auth.context";
import { Badge } from "../ui/badge";
import { Ellipsis } from "lucide-react";

export default function UserBtn() {
  const { user } = useAuth();
  const pfp = user?.user_metadata.avatar_url ?? "https://github.com/shadcn.png";
  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      return;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="min-w-full">
        <Button
          size="lg"
          variant="secondary"
          className="flex p-3 items-center relative justify-start min-w-full gap-3 h-[44px] hover:bg-accent"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={pfp || "https://github.com/shadcn.png"}
              alt="User Profile Picture"
            />
            <AvatarFallback>PFP</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium truncate">
              {user?.user_metadata.name || "Saidev Dhal"}
            </span>
            <div className="ml-xl absolute right-4">
              <Ellipsis className="size-5 text-muted-foreground" />
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-2xl bg-primary-foreground">
        <DropdownMenuLabel className="flex flex-row gap-3 cursor-pointer">
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={pfp || "https://github.com/shadcn.png"}
              alt="userdp"
            />
            <AvatarFallback>PFP</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-md">
              {user?.user_metadata.name || "UserName"}
            </span>
            {user ? (
              <Badge className="bg-green-400 h-4 mt-1">Synchronized</Badge>
            ) : (
              <Badge className="bg-muted-foreground h-4 mt-1">Syncing...</Badge>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="rounded-xl cursor-pointer">
            <IconSettingsCode className="h-5 w-5 mr-2" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <IconCirclesRelation className="h-5 w-5 mr-2" />
            Connections
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-xl cursor-pointer">
            <IconBrandGithubCopilot className="h-5 w-5 mr-2" />
            Customize
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href={"https://github.com/rxhul18/OrbitAi"}>
          <DropdownMenuItem className="rounded-xl cursor-pointer">
            <IconBrandGithub className="h-5 w-5 mr-2" />
            GitHub
          </DropdownMenuItem>
        </Link>
        <Link href={"https://github.com/sponsors/SkidGod4444"}>
          <DropdownMenuItem className="rounded-xl cursor-pointer">
            <IconHeartHandshake className="h-5 w-5 mr-2" />
            Support
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem disabled>
          <IconApi className="h-5 w-5 mr-2" />
          API
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* logout btn */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" className="rounded-xl w-full">
              <IconLogout className="h-5 w-5 mr-2" />
              Log out
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                You want to log out? You can&apos;t access this page after
                logging out.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSignOut}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
