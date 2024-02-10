export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          affiliate_link: string
          created_at: string | null
          image_url: string | null
          price: number
          product_description: string | null
          product_description_thai: string | null
          product_id: number
          product_name: string
          product_name_thai: string
          updated_at: string | null
        }
        Insert: {
          affiliate_link: string
          created_at?: string | null
          image_url?: string | null
          price: number
          product_description?: string | null
          product_description_thai?: string | null
          product_id?: never
          product_name: string
          product_name_thai: string
          updated_at?: string | null
        }
        Update: {
          affiliate_link?: string
          created_at?: string | null
          image_url?: string | null
          price?: number
          product_description?: string | null
          product_description_thai?: string | null
          product_id?: never
          product_name?: string
          product_name_thai?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          oauth_provider: string | null
          password_hash: string
          profile_picture_url: string | null
          updated_at: string | null
          user_id: number
          username: string
        }
        Insert: {
          created_at?: string | null
          email: string
          oauth_provider?: string | null
          password_hash: string
          profile_picture_url?: string | null
          updated_at?: string | null
          user_id?: never
          username: string
        }
        Update: {
          created_at?: string | null
          email?: string
          oauth_provider?: string | null
          password_hash?: string
          profile_picture_url?: string | null
          updated_at?: string | null
          user_id?: never
          username?: string
        }
        Relationships: []
      }
      wishlist_items: {
        Row: {
          added_at: string | null
          additional_description: string | null
          product_id: number
          quantity: number
          updated_at: string
          wishlist_id: number
          wishlist_item_id: number
        }
        Insert: {
          added_at?: string | null
          additional_description?: string | null
          product_id: number
          quantity: number
          updated_at?: string
          wishlist_id: number
          wishlist_item_id?: never
        }
        Update: {
          added_at?: string | null
          additional_description?: string | null
          product_id?: number
          quantity?: number
          updated_at?: string
          wishlist_id?: number
          wishlist_item_id?: never
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "wishlist_items_wishlist_id_fkey"
            columns: ["wishlist_id"]
            isOneToOne: false
            referencedRelation: "wishlists"
            referencedColumns: ["wishlist_id"]
          }
        ]
      }
      wishlists: {
        Row: {
          address: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          require_address: boolean | null
          title: string
          type: string | null
          updated_at: string | null
          user_id: number
          wishlist_id: number
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          require_address?: boolean | null
          title: string
          type?: string | null
          updated_at?: string | null
          user_id: number
          wishlist_id?: never
        }
        Update: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          require_address?: boolean | null
          title?: string
          type?: string | null
          updated_at?: string | null
          user_id?: number
          wishlist_id?: never
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
