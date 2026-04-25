import { createClient } from "@supabase/supabase-js";

const supabaseUrl=import.meta.env.VITE_SUPABASE_URL;
const supabaseKey=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase=createClient(
 supabaseUrl,
 supabaseKey
);

export async function ensureAppStateRow(){
 await supabase
 .from("app_state")
 .upsert({
   id:"global",
   payload:{},
   updated_at:new Date().toISOString()
 });
}

export async function loadAppState(){
 await ensureAppStateRow();

 const {data}=await supabase
 .from("app_state")
 .select("payload")
 .eq("id","global")
 .single();

 return data?.payload || {};
}

export async function saveAppState(payload){
 return supabase
 .from("app_state")
 .upsert({
   id:"global",
   payload,
   updated_at:new Date().toISOString()
 });
}