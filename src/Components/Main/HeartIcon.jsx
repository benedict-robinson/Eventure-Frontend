import { HeartIcon as HeartOutline} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid} from '@heroicons/react/24/solid'

export default function HeartIconComp({isFave}) {
  return (
    <div>
        {isFave ? <HeartSolid style={{ width: '24px', height: '22px', color: "#FF0035"}}/> : <HeartOutline style={{ width: '24px', height: '22px'}}/>}
    </div>
  )
}