import getLocalSiteInfo from "@/lib/getLocalSiteInfo";

const getWebTitle = () => {
  return getLocalSiteInfo().webTitle;
}

export default getWebTitle;