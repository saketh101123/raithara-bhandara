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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      admin_logs: {
        Row: {
          action: string
          admin_id: string
          created_at: string | null
          details: Json | null
          id: string
          target_id: string | null
          target_table: string | null
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string | null
          details?: Json | null
          id?: string
          target_id?: string | null
          target_table?: string | null
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          target_id?: string | null
          target_table?: string | null
        }
        Relationships: []
      }
      admin_sessions: {
        Row: {
          admin_id: string | null
          created_at: string | null
          expires_at: string
          id: string
          ip_address: unknown | null
          session_token: string
          user_agent: string | null
        }
        Insert: {
          admin_id?: string | null
          created_at?: string | null
          expires_at: string
          id?: string
          ip_address?: unknown | null
          session_token: string
          user_agent?: string | null
        }
        Update: {
          admin_id?: string | null
          created_at?: string | null
          expires_at?: string
          id?: string
          ip_address?: unknown | null
          session_token?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_sessions_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      announcements: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_active: boolean | null
          is_important: boolean | null
          title: string
          title_kannada: string | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_important?: boolean | null
          title: string
          title_kannada?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_important?: boolean | null
          title?: string
          title_kannada?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      applications: {
        Row: {
          created_at: string
          documents_submitted: number
          id: string
          notes: string | null
          progress: number
          scholarship_id: string
          status: string
          submitted_at: string | null
          total_documents: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          documents_submitted?: number
          id?: string
          notes?: string | null
          progress?: number
          scholarship_id: string
          status?: string
          submitted_at?: string | null
          total_documents?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          documents_submitted?: number
          id?: string
          notes?: string | null
          progress?: number
          scholarship_id?: string
          status?: string
          submitted_at?: string | null
          total_documents?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_scholarship_id_fkey"
            columns: ["scholarship_id"]
            isOneToOne: false
            referencedRelation: "scholarships"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_date: string | null
          duration: number
          end_date: string
          id: string
          quantity: number
          start_date: string
          status: string
          total_amount: number
          user_id: string
          warehouse_id: number
        }
        Insert: {
          booking_date?: string | null
          duration: number
          end_date: string
          id: string
          quantity: number
          start_date: string
          status: string
          total_amount: number
          user_id: string
          warehouse_id: number
        }
        Update: {
          booking_date?: string | null
          duration?: number
          end_date?: string
          id?: string
          quantity?: number
          start_date?: string
          status?: string
          total_amount?: number
          user_id?: string
          warehouse_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      live_darshan: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_live: boolean | null
          stream_url: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_live?: boolean | null
          stream_url?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_live?: boolean | null
          stream_url?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      local_bookmarks: {
        Row: {
          bookmarked_at: string
          id: string
          scholarship_data: Json
          session_id: string
        }
        Insert: {
          bookmarked_at?: string
          id?: string
          scholarship_data: Json
          session_id: string
        }
        Update: {
          bookmarked_at?: string
          id?: string
          scholarship_data?: Json
          session_id?: string
        }
        Relationships: []
      }
      otp_codes: {
        Row: {
          code: string
          created_at: string
          email: string
          expires_at: string
          id: string
          verified: boolean
        }
        Insert: {
          code: string
          created_at?: string
          email: string
          expires_at: string
          id?: string
          verified?: boolean
        }
        Update: {
          code?: string
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          verified?: boolean
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone_number: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone_number?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone_number?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pujas: {
        Row: {
          created_at: string | null
          description: string | null
          description_kannada: string | null
          duration_minutes: number | null
          id: string
          image_url: string | null
          is_available: boolean | null
          name: string
          name_kannada: string | null
          price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          description_kannada?: string | null
          duration_minutes?: number | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name: string
          name_kannada?: string | null
          price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          description_kannada?: string | null
          duration_minutes?: number | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name?: string
          name_kannada?: string | null
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string
          created_at: string | null
          id: number
          rating: number
          updated_at: string | null
          user_id: string
          warehouse_id: number
        }
        Insert: {
          comment: string
          created_at?: string | null
          id?: number
          rating: number
          updated_at?: string | null
          user_id: string
          warehouse_id: number
        }
        Update: {
          comment?: string
          created_at?: string | null
          id?: number
          rating?: number
          updated_at?: string | null
          user_id?: string
          warehouse_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_scholarships: {
        Row: {
          id: string
          notes: string | null
          saved_at: string
          scholarship_data: Json
          user_id: string | null
        }
        Insert: {
          id?: string
          notes?: string | null
          saved_at?: string
          scholarship_data: Json
          user_id?: string | null
        }
        Update: {
          id?: string
          notes?: string | null
          saved_at?: string
          scholarship_data?: Json
          user_id?: string | null
        }
        Relationships: []
      }
      scholarships: {
        Row: {
          amount: string
          application_deadline: string
          category: string
          created_at: string
          description: string
          eligibility: string
          id: string
          level: string
          name: string
          official_website: string
          provider: string
          requirements: Json | null
          updated_at: string
        }
        Insert: {
          amount: string
          application_deadline: string
          category: string
          created_at?: string
          description: string
          eligibility: string
          id?: string
          level: string
          name: string
          official_website: string
          provider: string
          requirements?: Json | null
          updated_at?: string
        }
        Update: {
          amount?: string
          application_deadline?: string
          category?: string
          created_at?: string
          description?: string
          eligibility?: string
          id?: string
          level?: string
          name?: string
          official_website?: string
          provider?: string
          requirements?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      temple_info: {
        Row: {
          address: string | null
          banner_image_url: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          phone: string | null
          timing_evening: string | null
          timing_morning: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          banner_image_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          phone?: string | null
          timing_evening?: string | null
          timing_morning?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          banner_image_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          phone?: string | null
          timing_evening?: string | null
          timing_morning?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_eligibility: {
        Row: {
          age: number | null
          caste: string | null
          course_type: string | null
          created_at: string
          current_class: string
          disability_percentage: number | null
          family_income: number
          family_status: string | null
          gender: string
          has_disability: boolean
          id: string
          percentage: number | null
          religion: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          age?: number | null
          caste?: string | null
          course_type?: string | null
          created_at?: string
          current_class: string
          disability_percentage?: number | null
          family_income: number
          family_status?: string | null
          gender: string
          has_disability?: boolean
          id?: string
          percentage?: number | null
          religion?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number | null
          caste?: string | null
          course_type?: string | null
          created_at?: string
          current_class?: string
          disability_percentage?: number | null
          family_income?: number
          family_status?: string | null
          gender?: string
          has_disability?: boolean
          id?: string
          percentage?: number | null
          religion?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      warehouses: {
        Row: {
          available: boolean | null
          created_at: string | null
          description: string | null
          id: number
          location: string
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          available?: boolean | null
          created_at?: string | null
          description?: string | null
          id: number
          location: string
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          available?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: number
          location?: string
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_otps: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_otp: {
        Args: { p_code: string; p_email: string; p_expires_at: string }
        Returns: boolean
      }
      verify_otp: {
        Args: { p_code: string; p_email: string }
        Returns: boolean
      }
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
