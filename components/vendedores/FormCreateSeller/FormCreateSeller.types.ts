import { Dispatch, SetStateAction } from "react";

export type FormCreateSellerProps = {

    userId: string;
    onSuccess?: () => void;
    refetchUsuario?: () => void;
};