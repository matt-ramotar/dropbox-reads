import axios, { AxiosResponse } from "axios";
import { GodTag } from "../types/GodTag";
import { VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets"

export default async function fetchGodTag(tagname: string): Promise<GodTag> {
    const response: AxiosResponse = await axios.get(API_URL + VERSION + `/tags/${tagname}/god`)
    const godTag: GodTag = response.data;
    return godTag;
}