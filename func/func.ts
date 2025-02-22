/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/db/supabase/client";
const supabase = createClient();

async function GenChatUUID(userId: string): Promise<string> {
    const totalLength = 40; // Total length of the resulting string
    const userIdLength = userId.length;
    const halfUserIdLength = Math.floor(userIdLength / 2);
    const slugLength = totalLength - halfUserIdLength - 2;
  
    // Generate a UUID-like string with the specified length
    const remainingUUID = Array.from({ length: slugLength }, (_, i) => {
      const c = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"[i];
      if (c === "-" || c === "4") return c;
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }).join("");
  
    // Slice the user ID to get the first half
    const halfUserId = userId.slice(0, halfUserIdLength);
  
    return `${halfUserId}--${remainingUUID}`;
  }
  
  export { GenChatUUID };

// ______________________________________________________________________________________________________________________
// USER FUNCTIONS
// ______________________________________________________________________________________________________________________

const storeUser = async (userData: any) => {
    const {
      id,
      email,
      user_metadata: { name, avatar_url },
    } = userData;
  
    const { data, error } = await supabase
      .from("users")
      .upsert({ id: id, name: name, email: email, pfp: avatar_url });
    if (error) {
      console.error("Error inserting or updating user data:", error);
    } else {
      console.log("User data upserted successfully");
    }
  };

  const updateUserName = async (userId: string, newName: string) => {
    const { data, error } = await supabase
      .from("users")
      .update({ name: newName })
      .eq("id", userId);
  
    if (error) {
      console.error("Error updating user name:", error);
    } else {
      console.log("User name updated successfully");
    }
  };

  const setUserCurrenChat = async (userId: string, currentChat: string) => {
    const { data, error } = await supabase
      .from("users")
      .update({ current_chat: currentChat })
      .eq("id", userId);
  
    if (error) {
      console.error("Error updating user current chat:", error);
      return false;
    } else {
      console.log("User current chat updated successfully");
      return true;
    }
  };
  
  const getUserCurrenChat = async (userId: string): Promise<string | null> => {
    const { data, error } = await supabase
      .from("users")
      .select("current_chat")
      .eq("id", userId)
      .single();
    if (error) {
      console.error("Error fetching user CC:", error);
      return null;
    }
  
    return data?.current_chat || null;
  };

  const getUserById = async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();
  
    if (error) {
      console.error("Error fetching user:", error);
      return null;
    } else if (data) {
      console.log("User found:", data);
      return data;
    } else {
      return null;
    }
  };

  const deleteUser = async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);
  
    if (error) {
      console.error("Error deleting user data:", error);
    } else {
      console.log("User data deleted successfully");
    }
  };

// ______________________________________________________________________________________________________________________
// CHATS FUNCTIONS
// ______________________________________________________________________________________________________________________

const storeChat = async (
  user_id: string,
  slug: string,
  title?: string,
  namespace?: string,
) => {
  const { data, error } = await supabase.from("chats").upsert({
    slug: slug,
    title: title,
    name_space: namespace,
    user_id: user_id,
  });
  if (error) {
    console.error("Error inserting or updating chat data:", error);
  } else {
    console.log("Chat data inserted successfully");
  }
};

const updateChatNameSpace = async (slug: string, namepsace: string) => {
  const { data, error } = await supabase
    .from("chats")
    .update({ name_space: namepsace })
    .eq("slug", slug);

  if (error) {
    console.error("Error updating chat namespace:", error);
  } else {
    console.log("Chat namespace updated successfully");
  }
};

const updateChatTitle = async (slug: string, title: string) => {
  const { data, error } = await supabase
    .from("chats")
    .update({ title: title })
    .eq("slug", slug);

  if (error) {
    console.error("Error updating chat title:", error);
  } else {
    console.log("Chat title updated successfully");
  }
};

const getChatsByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching chats:", error);
    return null;
  } else if (data) {
    console.log("Chats found:", data);
    return data;
  } else {
    return null;
  }
};

const getChatBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching chat:", error);
    return null;
  } else if (data) {
    console.log("Chat found:", data);
    return data;
  } else {
    return null;
  }
};

const deleteChat = async (chatId: string) => {
  const { data, error } = await supabase
    .from("chats")
    .delete()
    .eq("slug", chatId);

  if (error) {
    console.error("Error deleting chat data:", error);
  } else {
    console.log("Chat data deleted successfully");
  }
};

export {
    storeUser,
    getUserById,
    getUserCurrenChat,
    updateUserName,
    setUserCurrenChat,
    deleteUser
}