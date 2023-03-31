import React, { useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
const Table = ({ setUp, up, postUp, setPostUp }) => {
  const form = useRef();
  const updateTitle = useRef();
  const updateDiscount = useRef();
  const idTarget = useRef();
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState({
    title: "",
    discount: "",
    id: "",
  });
  console.log(inputValue);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handlePutRequest = (e) => {
    e.preventDefault();
    const id = idTarget.current.value;
    const formData = {
      title: updateTitle.current.value,
      discount: updateDiscount.current.value,
    };

    console.log(formData, id);

    fetch(`https://promo-code-server.vercel.app/api/v1/promoCode/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setUp("xyz");
          setInputValue("");
          closeModal();
        }
      });
  };
  useEffect(() => {
    setUp("");
    setPostUp("");
    async function fetchData() {
      const response = await fetch(
        "https://promo-code-server.vercel.app/api/v1/promoCode"
      );
      const data = await response.json();
      setData(data);
    }

    fetchData();
  }, [up, postUp, setUp, setPostUp]);

  const deletedPromoCode = async (id) => {
    console.log(id);
    try {
      const response = await fetch(
        `https://promo-code-server.vercel.app/api/v1/promoCode/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      console.log(data);
      if (data?.status === true) {
        toast.success("Successfully Deleted!");
        setUp("update");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = ({ search }) => {
    fetch(`https://promo-code-server.vercel.app/api/v1/searchCode/${search}`)
      .then((response) => response.json())
      .then((data) => {
        // Do something with the data
        toast.success(`Your Discount : ${data.data.discount}`);
      })
      .catch((error) => {
        console.error(error);
      });

    form.current.reset();
  };
  return (
    <>
      <div className="mt-16">
        <h1 className="mb-10 text-white text-3xl uppercase">
          List Of Promo Code
        </h1>

        <div className="mb-5 text-end">
          <form ref={form} onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <input
                className="w-80 appearance-none rounded-sm border-0 p-2 px-4 focus:ring-2 focus:ring-orange-500"
                type="text"
                {...register("search")}
                id="search"
              />

              <button
                type="submit"
                className="rounded-sm ml-3  bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500 w-36"
              >
                Add To List
              </button>
            </div>
          </form>
        </div>
        <div className="overflow-hidden rounded-sm border border-gray-200 shadow-md">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Promo Code Name
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Amount Of Discount
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Re-Edit
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Actions
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                ></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {data?.data?.map((item, inx) => (
                <tr key={inx} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className=" py-4">{item.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                      {item.discount}
                    </span>
                  </td>
                  <td className="px-6 py-4 cursor-pointer">
                    <button
                      type="button"
                      onClick={() => {
                        openModal();
                        setInputValue({
                          title: item.title,
                          discount: item.discount,
                          id: item._id,
                        });
                      }}
                      className="rounded-md bg-black bg-opacity-20  text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                  </td>
                  <td
                    onClick={() => deletedPromoCode(item._id)}
                    className="px-6 py-4 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                      x-tooltip="tooltip"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </td>

                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      onClose={closeModal}
                    >
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                      </Transition.Child>

                      <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-500/50 p-6 text-left align-middle shadow-xl transition-all">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-white"
                              >
                                Update Promo Code
                              </Dialog.Title>

                              <form
                                onSubmit={handlePutRequest}
                                className="mt-5"
                              >
                                <div className="flex gap-5">
                                  <input
                                    ref={updateTitle}
                                    defaultValue={inputValue?.title}
                                    className="w-60 text-black appearance-none p-2 outline-none border-black rounded-md px-4 focus:ring-2 focus:ring-orange-500"
                                    type="text"
                                  />

                                  <input
                                    ref={idTarget}
                                    defaultValue={inputValue?.id}
                                    className="w-20 hidden text-black appearance-none p-2 outline-none border-black rounded-md px-4 focus:ring-2 focus:ring-orange-500"
                                    type="text"
                                  />

                                  <input
                                    ref={updateDiscount}
                                    defaultValue={inputValue?.discount}
                                    className="w-20 text-black appearance-none p-2 outline-none border-black rounded-md px-4 focus:ring-2 focus:ring-orange-500"
                                    type="text"
                                  />
                                </div>
                                <div className="mt-4">
                                  <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </form>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
