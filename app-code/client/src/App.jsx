import { useEffect, useState } from "react";
import "./App.css";
import { toast } from "sonner";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
function App() {
  const [email, setEmail] = useState([]);
  const [value, setvalue] = useState("");
  const [edit, setEdit] = useState();
  console.log(edit);
  const [editable, setEditable] = useState("");
  async function getMail() {
    try {
      const res = await fetch("/api/email");

      const data = await res.json();

      if (res.ok) {
        setEmail(data);
      }

      if (!res.ok) {
        console.log(data);
        toast.error(data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getMail();
  }, []);

  async function createHandel(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ email: value }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(data);
        toast.success(data);
        getMail();
      } else {
        console.error(data);
        toast.error(data);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  }

  async function editHandel(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/edit", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ email: edit, editable }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(data);
        toast.success(data);
        getMail();
      } else {
        console.error(data);
        toast.error(data);
      }
      setEditable("");
      setEdit("");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  }

  async function deleteHandel(email) {
    try {
      const res = await fetch("/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(data);
        toast.success(data);
        getMail();
      } else {
        console.error(data);
        toast.error(data);
      }
      
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  }

  return (
    <>
      <div>
        <h1>To Do App</h1>

        <form onSubmit={createHandel}>
          <input
            type="email"
            value={value}
            onChange={(e) => {
              setvalue(e.target.value);
            }}
            required
            placeholder="Enter Your email"
          />
          <button>Submit</button>
        </form>

        <div className="box">
          <h2>Due Works</h2>
          {email.map((em) => {
            return (
              <form className="email" key={em.email} onSubmit={editHandel}>
                <input
                  value={editable === em.email ? edit : em.email}
                  type="email"
                  onChange={(e) => {
                    if (editable === em.email) {
                      setEdit(e.target.value);
                    }
                  }}
                  disabled={editable !== em.email}
                  style={
                    editable === em.email
                      ? {}
                      : { border: 0, background: "transparent" }
                  }
                />
                <button
                  type="button"
                  onClick={() => {
                    setEditable(em.email);
                    setEdit(em.email);
                  }}
                >
                  <CiEdit />
                </button>
                <button type="button" onClick={() => deleteHandel(em.email)}>
                  <MdDelete />
                </button>
              </form>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
