import type { Meta, StoryObj } from "@storybook/react";
import { UserMessageAttachments, ComposerAttachments } from './attachment';
import { MessagePrimitive, ComposerPrimitive, ThreadPrimitive } from "@assistant-ui/react";

const meta: Meta = {
  title: "Assistant UI/Attachment",
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const UserAttachments: StoryObj = {
  render: () => (
    <div className="w-[400px]">
      <MessagePrimitive.Root message={{ 
        id: "1", 
        role: "user", 
        content: [], 
        createdAt: new Date(),
        attachments: [
          { id: "1", type: "image", name: "beach.jpg", contentType: "image/jpeg", content: [], status: { type: "complete" } },
          { id: "2", type: "document", name: "notes.pdf", contentType: "application/pdf", content: [], status: { type: "complete" } }
        ]
      }}>
        <UserMessageAttachments />
      </MessagePrimitive.Root>
    </div>
  )
};

export const Composer: StoryObj = {
  render: () => (
    <div className="w-[400px] border p-4 rounded-xl">
       <ThreadPrimitive.Root>
          <ComposerPrimitive.Root>
            <ComposerAttachments />
          </ComposerPrimitive.Root>
       </ThreadPrimitive.Root>
    </div>
  )
};
