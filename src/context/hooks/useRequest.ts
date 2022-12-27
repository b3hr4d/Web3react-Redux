import { useSelector } from "react-redux"
import store, { RootState } from "../store"

export const updateRequest = () => store.dispatch.request.fetchRequest()

const useRequest = () => useSelector((state: RootState) => state.database)

export default useRequest
