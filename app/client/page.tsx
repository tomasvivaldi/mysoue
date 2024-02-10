"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

type Todo = Database["public"]["Tables"]["wishlists"]["Row"];

export default function Page() {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("wishlists").select();
      setTodos(data);
    };

    getData();
  }, []);

  return todos ? (
    <pre>{JSON.stringify(todos, null, 2)}</pre>
  ) : (
    <p>Loading todos...</p>
  );
}
