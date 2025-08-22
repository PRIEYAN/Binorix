// hooks/useJwt.ts
"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export interface JwtPayload {
  _id?: string;
  phoneNumber?: string;
  email?: string;
  name?: string;
  iat?: number;
  exp?: number;
  [key: string]: any;
}

export function useJwt(role: string) {
  const [payload, setPayload] = useState<JwtPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJwt = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found");
          setLoading(false);
          return;
        }

        // ✅ Removed colon here
        const res = await axios.post(`http://localhost:5050/api/jwt/${role}`, {
          token,
        });

        setPayload(res.data.payload);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch JWT");
      } finally {
        setLoading(false);
      }
    };

    fetchJwt();
  }, [role]);

  return { payload, loading, error };
}
