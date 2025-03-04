/* eslint-disable @typescript-eslint/no-unused-vars */
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

// ______________________________________________________________________________________________________________________
// SPACES FUNCTIONS
// ______________________________________________________________________________________________________________________

const storeSpace = async (
  user_id: string,
  name: string,
  description?: string,
  resources?: string[],
) => {
  const { data, error } = await supabase.from("spaces").upsert({
    name: name,
    resources: resources,
    desc: description,
    user_id: user_id,
  });
  if (error) {
    console.error("Error inserting or updating space data:", error);
  } else {
    console.log("Space data inserted successfully");
  }
};

const updateSpaceNameSpace = async (id: string, namepsace: string) => {
  const { data, error } = await supabase
    .from("spaces")
    .update({ name_space: namepsace })
    .eq("id", id);

  if (error) {
    console.error("Error updating space namespace:", error);
  } else {
    console.log("Space namespace updated successfully");
  }
};

const updateSpaceDescription = async (id: string, description: string) => {
  const { data, error } = await supabase
    .from("spaces")
    .update({ description: description })
    .eq("id", id);

  if (error) {
    console.error("Error updating space description:", error);
  } else {
    console.log("Space description updated successfully");
  }
};

const deleteSpace = async (spaceId: string) => {
  const { data, error } = await supabase
    .from("spaces")
    .delete()
    .eq("id", spaceId);

  if (error) {
    console.error("Error deleting space data:", error);
  } else {
    console.log("Space data deleted successfully");
  }
};

const getSpaceById = async (id: string) => {
  const { data, error } = await supabase
    .from("spaces")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching space:", error);
    return null;
  } else if (data) {
    console.log("Space found:", data);
    return data;
  } else {
    return null;
  }
};

const getSpaceByName = async (name: string, userId: string): Promise<any> => {
  const { data, error } = await supabase
    .from("spaces")
    .select("*")
    .eq("name", name)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching space:", error);
    return null;
  } else if (data) {
    console.log("Space found:", data);
    return data;
  } else {
    return null;
  }
};

const getSpacesByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from("spaces")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching spaces:", error);
    return null;
  } else if (data) {
    console.log("Spaces found:", data);
    return data;
  } else {
    return null;
  }
};

// ______________________________________________________________________________________________________________________
// RESOURCES FUNCTIONS
// ______________________________________________________________________________________________________________________

const storeResource = async (
  user_id: string,
  title: string,
  type: string,
  content: string,
  spaces?: string,
) => {
  const { data, error } = await supabase.from("resources").upsert({
    title: title,
    spaces: spaces,
    type: type,
    content: content,
    user_id: user_id,
  });
  if (error) {
    console.error("Error inserting or updating resource data:", error);
  } else {
    console.log("Resource data inserted successfully");
  }
};

const updateResourceContent = async (id: string, content: string) => {
  const { data, error } = await supabase
    .from("resources")
    .update({ content: content })
    .eq("id", id);

  if (error) {
    console.error("Error updating resource content:", error);
  } else {
    console.log("Resource content updated successfully");
  }
};

const updateResourceSpaces = async (id: string, spaces: string | null) => {
  const { data, error } = await supabase
    .from("resources")
    .update({ spaces: spaces })
    .eq("id", id);

  if (error) {
    console.error("Error updating resource content:", error);
  } else {
    console.log("Resource content updated successfully");
  }
};

const getResourceById = async (id: string) => {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching resource:", error);
    return null;
  } else if (data) {
    console.log("Resource found:", data);
    return data;
  } else {
    return null;
  }
};

const getResourcesByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching resources:", error);
    return null;
  } else if (data) {
    console.log("Resources found:", data);
    return data;
  } else {
    return null;
  }
};

const getResourcesByType = async (
  userId: string,
  type = "html | txt | pdf | csv",
) => {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("user_id", userId)
    .eq("type", type);
  if (error) {
    console.error("Error fetching resources:", error);
    return null;
  } else if (data) {
    console.log("Resources found:", data);
    return data;
  } else {
    return null;
  }
};

const deleteResource = async (id: string) => {
  const { data, error } = await supabase
    .from("resources")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting resource data:", error);
  } else {
    console.log("Resource data deleted successfully");
  }
};

// ______________________________________________________________________________________________________________________
// UPLOADS FUNCTIONS
// ______________________________________________________________________________________________________________________

const getFileUrl = async (filepath: string) => {
  const { data } = await supabase.storage
    .from("orbit")
    .createSignedUrl(filepath, 604800);

  if (data) {
    console.log("File url fetched successfully");
    return data.signedUrl;
  } else {
    console.error("Error fetching file url");
    return null;
  }
};

export {
  storeUser,
  getUserById,
  getUserCurrenChat,
  updateUserName,
  setUserCurrenChat,
  deleteUser,
  storeChat,
  updateChatNameSpace,
  updateChatTitle,
  getChatsByUserId,
  getChatBySlug,
  deleteChat,
  storeSpace,
  updateSpaceNameSpace,
  updateSpaceDescription,
  deleteSpace,
  getSpaceById,
  getSpaceByName,
  getSpacesByUserId,
  storeResource,
  updateResourceContent,
  updateResourceSpaces,
  getResourceById,
  getResourcesByUserId,
  getResourcesByType,
  deleteResource,
  getFileUrl,
};
