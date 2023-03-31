import apiSlice from "../api/apiSlice";

const promoCodeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPromoCode: builder.query({
      query: () => ({
        url: `/api/v1/promoCode`,
      }),
    }),
  }),
});

export const { useGetAllPromoCodeQuery } = promoCodeApi;
