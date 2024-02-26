import { HiXMark } from "react-icons/hi2"
import Button from "../../ui/Button"
import { useDeleteNotification } from "./useDeleteNotification"
import { convertTimestamp } from "../../utils/helpers"

function NotificationTemplate({ notificationData }) {
    const { subject, body, id, created_at } = notificationData
    const { isDeleting, deleteNotification } = useDeleteNotification()
  return (
    <li className="flex justify-between min-w-[300px] dark:bg-slate-700 bg-gray-300 mb-6 rounded-lg p-2 border-[2px] border-dotted border-green-700">
        <div>
            <h1 className="text-2xl font-extrabold dark:text-gray-400 text-gray-800">{subject}</h1>
            <p className="dark:text-gray-300 text-black">{body}</p>
        </div>
        <p className="self-end dark:text-gray-400 italic">{convertTimestamp(created_at)}</p>
        <Button type='notify' disabled={isDeleting} onClick={() => deleteNotification(id)}><HiXMark className="text-3xl"/></Button>
    </li>
  )
}

export default NotificationTemplate