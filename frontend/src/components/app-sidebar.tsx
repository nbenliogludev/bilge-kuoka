import { Plus, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Document, useSavedDocuments } from "@/routes/select-categories/store/contentStore";
import MarkdownRenderer from "@/utils/MarkDownRenderer";

// Menu items.
const items = [
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
    const {
        // state,
        // open,
        // setOpen,
        // openMobile,
        // setOpenMobile,
        // isMobile,
        // toggleSidebar,
      } = useSidebar()
      
    const navigate = useNavigate();

    const savedDocuments = useSavedDocuments();

    console.log(savedDocuments, 'savedDocuments')

    const renderSavedDocument = ( {item}: {item: Document} ) => {
      const [header] = item.data.split('\n');
      return (
        <div>
          <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <Link to={item.id} >
                  {" "}
                  <span>
                    <MarkdownRenderer markdownText={header} />
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </div>
      );
    }
    
    const handleStartNewTab = () => {
        navigate('/start')
    }

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarTrigger />
          <SidebarGroupLabel>Bilge Quoka</SidebarGroupLabel>
          <SidebarGroupAction title="Yeni bilge sekmesi" onClick={handleStartNewTab}>
            <Plus /> <span className="sr-only">Yeni Bilge sekmesi</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {savedDocuments.map((item) => renderSavedDocument({item}))}
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      {" "}
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
