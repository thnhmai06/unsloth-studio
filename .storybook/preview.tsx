import type { Preview } from "@storybook/react";
import { ReactFlowProvider } from "@xyflow/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AppProvider } from "../src/app/provider";
import { SidebarProvider } from "../src/components/ui/sidebar";
import { ChatRuntimeProvider } from "../src/features/chat/runtime-provider";
import "../src/index.css"; // Import file CSS chính chứa Tailwind

const preview: Preview = {
  decorators: [
    (Story) => {
      const rootRoute = createRootRoute();
      const indexRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: "/",
        component: Story,
      });

      const router = createRouter({
        routeTree: rootRoute.addChildren([indexRoute]),
        history: createMemoryHistory({ initialEntries: ["/"] }),
      });

      return (
        <AppProvider>
          <SidebarProvider>
            <ReactFlowProvider>
              <ChatRuntimeProvider>
                <RouterProvider router={router} />
              </ChatRuntimeProvider>
            </ReactFlowProvider>
          </SidebarProvider>
        </AppProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
  },
};

export default preview;
