import { CalendarIcon as CalendarOutline} from '@heroicons/react/24/outline'
import { CalendarIcon as CalendarSolid} from '@heroicons/react/24/solid'

export default function CalendarIconComp({isGoing}) {
  return (
    <div>
        {isGoing ? <CalendarSolid style={{ width: '24px', height: '22px', color: "#8744ac"}}/> : <CalendarOutline style={{ width: '24px', height: '22px'}}/>}
    </div>
  )
}