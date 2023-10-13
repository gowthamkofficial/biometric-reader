export interface MantraResult {
    PidData: PidData
}
interface PidData {
    Resp: Resp
    DeviceInfo: DeviceInfo
    Skey: Skey
    Hmac: string
    Data: Data
}

interface Resp {
    $: GeneratedType
}

interface GeneratedType {
    errCode: string
    errInfo: string
    fCount: string
    fType: string
    nmPoints: string
    qScore: string
}

interface DeviceInfo {
    $: GeneratedType2
    additional_info: AdditionalInfo
}

interface GeneratedType2 {
    dpId: string
    rdsId: string
    rdsVer: string
    mi: string
    mc: string
    dc: string
}

interface AdditionalInfo {
    Param: Param[]
}

interface Param {
    $: GeneratedType3
}

interface GeneratedType3 {
    name: string
    value: string
}

interface Skey {
    _: string
    $: GeneratedType4
}

interface GeneratedType4 {
    ci: string
}

interface Data {
    _: string
    $: GeneratedType5
}

interface GeneratedType5 {
    type: string
}
