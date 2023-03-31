import { useState } from "react";
import Form from "./Page/Form";
import Table from "./Page/Table";

function App() {
  const [up, setUp] = useState("");
  const [postUp, setPostUp] = useState("");
  return (
    <section className="h-screen bg-slate-900">
      <div className="container mx-auto py-10">
        <Form setPostUp={setPostUp} />
        <Table setPostUp={setPostUp} postUp={postUp} setUp={setUp} up={up} />
      </div>
    </section>
  );
}

export default App;
