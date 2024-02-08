import { Subscription, UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
    [propName: string]: any;
};

export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext();
    //rename since our hook us useUser()
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    /**
     * We are going to use this hook to load userDetials as well
     * as load the subscription.
     * 
     * Now we can use this hook anywhere to check if the user has 
     * a subscription or is authenticated 
     */
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);


    const getUserDetails = () => supabase.from('users').select('*').single();
    /**
     * @returns a subscription that is trialing or active
     */
    const getSubsciption = () => supabase.from('subscriptions').select('*,  prices(*, products(*)').in('status', ['trialing', 'active']).single();

    useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsLoadingData(true);

            //Lets get all the information we need via a pormise
            Promise.allSettled([getUserDetails(), getSubsciption()]).then(
                (results) => {
                    const userDetailsPromise = results[0];
                    const subscriptionsPromise = results[1];

                    if (userDetailsPromise.status == "fulfilled") {
                        setUserDetails(userDetailsPromise.value.data as UserDetails);
                    }

                    if (subscriptionsPromise.status == "fulfilled") {
                        setSubscription(subscriptionsPromise.value.data as unknown as Subscription);
                    }

                    setIsLoadingData(false);
                }
            )
        } else if (!user && !isLoadingUser && !isLoadingData) {
            //nothing was able to be recieved so we reset
            setUserDetails(null);
            setSubscription(null);
        }

    }, [user, isLoadingUser])

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingData || isLoadingUser,
        subscription
    }

    return <UserContext.Provider value={value} {...props} />

};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context == undefined) {
        throw new Error("userUser hook was attempted to use outside of 'MyUserContextProvider'");
    }

    return context;
}