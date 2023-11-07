import { FiTrash } from "react-icons/fi";
import { api } from "./services/api.ts";

import { FormEvent, useEffect, useRef, useState } from "react";

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  stauts: boolean;
  created_at: string;
}

export default function App() {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [dataCount, setDataCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadCustomers();
    handleDataCount();
  }, []);

  async function loadCustomers() {
    const response = await api.get("/customers");
    setCustomers(response.data);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!nameRef.current?.value || !emailRef.current?.value) return;

    const response = await api.post("/customer", {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
    });
    setCustomers((allCustomers) => [...allCustomers, response.data]);

    nameRef.current.value = "";
    emailRef.current.value = "";
  }

  async function handleDelete(id: string) {
    try {
      await api.delete("/customer", {
        params: {
          id: id,
        },
      });
      const allCustomers = customers.filter((customer) => customer.id !== id);
      setCustomers(allCustomers);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDataCount() {
    try {
      const response = await api.get<{ count: number }>("/customer/data-count");
      setDataCount(response.data.count);
    } catch (error) {
      console.error("Erro ao obter dados do MongoDB:", error);
    }
  }
  async function handleSearch() {
    try {
      const response = await api.get(`/customer/filter?campo=${searchTerm}`);
      setCustomers(response.data);
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Clientes</h1>
        <h2 className="text-4xl font-medium text-white">
          Quantidade de clientes: {dataCount}
        </h2>
        <div>
          <label className="font-medium text-white">Pesquisar:</label>
          <input
            type="text"
            placeholder="Digite o termo da sua busca..."
            className="w-full mb-5 p-2 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            className="bg-gray-500 h-9  text-white rounded  "
            onClick={() => handleSearch()}
          >
            Buscar
          </button>

          <h2 className="text-4xl font-medium text-white">
            Resultados da busca:
          </h2>
          <ul className="font-medium text-white">
            {customers.map((customer) => (
              <li className="font-medium text-white" key={customer.name}></li>
            ))}
          </ul>
        </div>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome:</label>

          <input
            type="text"
            placeholder="Digite seu nome completo..."
            className="w-full mb-5 p-2 rounded"
            ref={nameRef}
          />

          <label className="font-medium text-white">Email:</label>
          <input
            type="email"
            placeholder="Digite seu email..."
            className="w-full mb-5 p-2 rounded"
            ref={emailRef}
          />

          <input
            type="submit"
            value="Cadastrar"
            className="cursor-pointer w-full mb-5 p-2  bg-green-500 rounded font-medium"
          />
        </form>

        <section className="flex flex-col gap-4">
          {customers.map((customer) => (
            <article
              key={customer.id}
              className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200"
            >
              <p>
                <span className="font-medium">Nome:</span>
                {customer.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {customer.email}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {customer.stauts ? "ATIVO" : "INATIVO"}
              </p>

              <button
                className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
                onClick={() => handleDelete(customer.id)}
              >
                <FiTrash size={18} color="#fff" />
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
