import { createThirdwebClient } from "thirdweb";

const thirdWebClient = createThirdwebClient({
    clientId: import.meta.env.VITE_PUBLIC_THIRDWEB_CLIENT_ID,
});

export default thirdWebClient