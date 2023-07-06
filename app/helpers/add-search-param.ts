import { ReadonlyURLSearchParams } from "next/navigation"
import qs from "query-string"

export const addSearchParam = (
  params: ReadonlyURLSearchParams,
  paramKey: string,
  paramValue: string
) => {
  let currentQuery = {}

  if (params) {
    currentQuery = qs.parse(params.toString())
  }

  const updatedQuery: any = {
    ...currentQuery,
    [paramKey]: paramValue,
  }

  // Toggle
  if (params?.get(paramKey) === paramValue) {
    delete updatedQuery.category
  }

  const url = qs.stringifyUrl(
    {
      url: "/",
      query: updatedQuery,
    },
    { skipNull: true }
  )
  return url
}
