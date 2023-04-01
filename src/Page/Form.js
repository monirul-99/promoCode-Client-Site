import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Form = ({ setPostUp }) => {
  const { register, handleSubmit } = useForm();
  const form = useRef();
  const onSubmit = async ({ promoCode, discount }) => {
    const formData = { title: promoCode, discount };
    console.log(formData);
    try {
      const response = await fetch(
        "https://promo-code-server.vercel.app/api/v1/promoCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.success === true) {
        toast.success("Promo Code Added Success!");
        setPostUp("Update");
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    form.current.reset();
  };

  return (
    <section className="text-slate-300 flex justify-center items-center text-center">
      <form ref={form} onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <div className="flex flex-col items-start">
            <label htmlFor="promoCode">Promo Code</label>
            <input
              className="mt-2 w-80 text-black appearance-none rounded-md border-0 p-2 px-4 focus:ring-2 focus:ring-orange-500"
              type="promoCode"
              {...register("promoCode")}
              id="promoCode"
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="discount">Discount Amount</label>
            <input
              className="mt-2 w-80 text-black appearance-none rounded-md border-0 p-2 px-4 focus:ring-2 focus:ring-orange-500"
              type="text"
              id="discount"
              {...register("discount")}
            />
          </div>
          <div className="relative !mt-8">
            <button
              type="submit"
              className="lg:rounded-sm rounded-full  bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500 w-36"
            >
              Add To List
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Form;
