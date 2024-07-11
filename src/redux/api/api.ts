import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v4" }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (options) => {
        const params = new URLSearchParams();
        if (options?.page) {
          params.append("page", options.page);
        }
        if (options?.limit) {
          params.append("limit", options.limit);
          // console.log("skip: ", options.skip);
        }
        if (options?.searchTerm) {
          params.append("searchTerm", options.searchTerm);
          // console.log("skip: ", options.skip);
        }
        if (options?.sortBy) {
          params.append("sort", options.sortBy);
          // console.log("skip: ", options.skip);
        }
        if (options?.filterObject?.name && options?.filterObject?.value) {
          params.append(
            options?.filterObject?.name,
            options?.filterObject?.value
          );
          // console.log("skip: ", options.skip);
        }

        return {
          url: `/products`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["products"],
    }),
    getProductDetails: builder.query({
      query: (id) => {
        // const params = new URLSearchParams();
        // if (priority) {
        //   params.append("priority", priority);
        // }
        return {
          url: `/products/${id}`,
          method: "GET",
          //   params: params,
        };
      },
    }),
    getProductCategories: builder.query({
      query: () => ({
        url: `/products/categories`,
        method: "GET",
      }),
    }),
    postNewProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: (options) => ({
        url: `/products/${options.currentId}`,
        method: "PATCH",
        body: options.updatedValues,
      }),
      invalidatesTags: ["products"],
    }),
    DeleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    getAllProductCategoriesName: builder.query({
      query: () => {
        return {
          url: `/categories-product/name`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetProductCategoriesQuery,
  usePostNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllProductCategoriesNameQuery,
} = baseApi;
