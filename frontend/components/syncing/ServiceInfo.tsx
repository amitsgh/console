import { EnvironmentSyncType, RailwayProjectType, RailwayResourceInput } from '@/apollo/graphql'
import { FaEyeSlash, FaLock } from 'react-icons/fa'

export const ServiceInfo = (props: { sync: EnvironmentSyncType }) => {
  const { sync } = props

  if (sync.serviceInfo?.id?.includes('cloudflare')) {
    return (
      <div className="flex gap-2">
        {JSON.parse(sync.options)['project_name']}
        <span className="text-neutral-500 font-normal">
          ({JSON.parse(sync.options)['environment']})
        </span>
      </div>
    )
  } else if (sync.serviceInfo?.id?.includes('aws')) {
    const secretName = JSON.parse(sync.options)['secret_name']

    return <div className="flex gap-2 text-neutral-500">{secretName}</div>
  } else if (sync.serviceInfo?.id?.includes('github')) {
    const repoName = JSON.parse(sync.options)['repo_name']
    const owner = JSON.parse(sync.options)['owner']

    return (
      <div className="flex gap-2 text-neutral-500">
        {owner}/{repoName}
      </div>
    )
  } else if (sync.serviceInfo?.id?.includes('hashicorp_vault')) {
    const engine = JSON.parse(sync.options)['engine']
    const path = JSON.parse(sync.options)['path']

    return (
      <div className="flex gap-2 text-xs text-neutral-500">
        {engine}data/{path}
      </div>
    )
  } else if (sync.serviceInfo?.id?.includes('hashicorp_nomad')) {
    const path = JSON.parse(sync.options)['path']
    const namespace = JSON.parse(sync.options)['namespace']

    return (
      <div className="flex gap-2 text-xs text-neutral-500">
        {path}@{namespace || 'default'}
      </div>
    )
  } else if (sync.serviceInfo?.id?.includes('gitlab_ci')) {
    const path = JSON.parse(sync.options)['resource_path']
    const isMasked = JSON.parse(sync.options)['masked']
    const isProtected = JSON.parse(sync.options)['protected']

    return (
      <div className="flex gap-2 text-xs text-neutral-500 items-center">
        {path}
        {isMasked && <FaEyeSlash title="Masked" />}
        {isProtected && <FaLock title="Protected" />}
      </div>
    )
  } else if (sync.serviceInfo?.id?.includes('railway')) {
    const project: RailwayResourceInput = JSON.parse(sync.options)['project']
    const environment: RailwayResourceInput = JSON.parse(sync.options)['environment']
    const service: RailwayResourceInput | undefined = JSON.parse(sync.options)['service']

    return (
      <div className="flex gap-2 text-xs text-neutral-500">
        {project.name} {service ? ` - ${service.name}` : ''} ({environment.name})
      </div>
    )
  } else return <>{sync.serviceInfo?.id}</>
}
