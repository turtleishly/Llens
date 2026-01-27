export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      registrations: {
        Row: {
          advisor_contact_number: string
          advisor_email: string
          advisor_full_name: string
          advisor_relationship: string
          advisor_relationship_details: string
          advisor_relationship_other: string | null
          category: string
          created_at: string
          heard_about: string
          heard_about_other: string | null
          id: string
          member1_contact_number: string
          member1_email: string
          member1_full_name: string
          member1_graduation_date: string
          member1_ic_number: string
          member1_qualification: string
          member1_school: string
          member2_contact_number: string
          member2_email: string
          member2_full_name: string
          member2_graduation_date: string
          member2_ic_number: string
          member2_qualification: string
          member2_school: string
          member3_contact_number: string
          member3_email: string
          member3_full_name: string
          member3_graduation_date: string
          member3_ic_number: string
          member3_qualification: string
          member3_school: string
          member4_contact_number: string
          member4_email: string
          member4_full_name: string
          member4_graduation_date: string
          member4_ic_number: string
          member4_qualification: string
          member4_school: string
          team_name: string
          track: string
        }
        Insert: {
          advisor_contact_number: string
          advisor_email: string
          advisor_full_name: string
          advisor_relationship: string
          advisor_relationship_details: string
          advisor_relationship_other?: string | null
          category: string
          created_at?: string
          heard_about: string
          heard_about_other?: string | null
          id?: string
          member1_contact_number: string
          member1_email: string
          member1_full_name: string
          member1_graduation_date: string
          member1_ic_number: string
          member1_qualification: string
          member1_school: string
          member2_contact_number: string
          member2_email: string
          member2_full_name: string
          member2_graduation_date: string
          member2_ic_number: string
          member2_qualification: string
          member2_school: string
          member3_contact_number: string
          member3_email: string
          member3_full_name: string
          member3_graduation_date: string
          member3_ic_number: string
          member3_qualification: string
          member3_school: string
          member4_contact_number: string
          member4_email: string
          member4_full_name: string
          member4_graduation_date: string
          member4_ic_number: string
          member4_qualification: string
          member4_school: string
          team_name: string
          track: string
        }
        Update: {
          advisor_contact_number?: string
          advisor_email?: string
          advisor_full_name?: string
          advisor_relationship?: string
          advisor_relationship_details?: string
          advisor_relationship_other?: string | null
          category?: string
          created_at?: string
          heard_about?: string
          heard_about_other?: string | null
          id?: string
          member1_contact_number?: string
          member1_email?: string
          member1_full_name?: string
          member1_graduation_date?: string
          member1_ic_number?: string
          member1_qualification?: string
          member1_school?: string
          member2_contact_number?: string
          member2_email?: string
          member2_full_name?: string
          member2_graduation_date?: string
          member2_ic_number?: string
          member2_qualification?: string
          member2_school?: string
          member3_contact_number?: string
          member3_email?: string
          member3_full_name?: string
          member3_graduation_date?: string
          member3_ic_number?: string
          member3_qualification?: string
          member3_school?: string
          member4_contact_number?: string
          member4_email?: string
          member4_full_name?: string
          member4_graduation_date?: string
          member4_ic_number?: string
          member4_qualification?: string
          member4_school?: string
          team_name?: string
          track?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
