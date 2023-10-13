
 export interface StartekResult {
    PidData: PidData
}
 interface PidData {
    $: GeneratedType
    Resp: Resp
    DeviceInfo: DeviceInfo
    Skey: Skey
    Hmac: string
    Data: Data
}

 interface GeneratedType {
    "xmlns:xsi": string
    "xmlns:xsd": string
}

 interface Resp {
    $: GeneratedType2
}

 interface GeneratedType2 {
    fType: string
    iCount: string
    pCount: string
    errCode: string
    errInfo: string
    fCount: string
    nmPoints: string
    qScore: string
}

 interface DeviceInfo {
    $: GeneratedType3
    additional_info: AdditionalInfo
}

 interface GeneratedType3 {
    dpId: string
    rdsId: string
    rdsVer: string
    dc: string
    mi: string
    mc: string
    error: string
}

 interface AdditionalInfo {
    Param: Param[]
}

 interface Param {
    $: GeneratedType4
}

 interface GeneratedType4 {
    name: string
    value: string
}

 interface Skey {
    _: string
    $: GeneratedType5
}

 interface GeneratedType5 {
    ci: string
}

 interface Data {
    _: string
    $: GeneratedType6
}

 interface GeneratedType6 {
    type: string
}
