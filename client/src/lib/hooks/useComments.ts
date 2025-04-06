import { useLocalObservable } from "mobx-react-lite"
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr'
import { useEffect, useRef } from "react";
import { runInAction } from "mobx";

export const useComments = (projectId?:string) =>{
    const created = useRef(false);
    const commentStore = useLocalObservable(() => ({
        comments: [] as ChatComment[],
        hubConnection: null as HubConnection | null,

        createHubConnection(projectId:string) {
            if(!projectId) return;

            this.hubConnection = new HubConnectionBuilder()
                .withUrl(`${import.meta.env.VITE_COMMENT_URL}?projectId=${projectId}`
                    ,{withCredentials: true})
                .withAutomaticReconnect()
                .build();

            this.hubConnection.start().catch(error => console.log('Error establishing connection: ', error))

            this.hubConnection.on('LoadComments', comments => {
                runInAction(() =>{
                    this.comments = comments
                })
            });

            this.hubConnection.on('RecieveComment', comment =>{
                runInAction(() =>{
                    this.comments.unshift(comment)
                }) 
            })
        },

        stopHubConnection() {
            if (this.hubConnection?.state === HubConnectionState.Connected) {
                this.hubConnection.stop().catch(error => console.log('Error stopping connection: ', error))
            }
        }
    }));

    useEffect (() =>{
        if (projectId && !created.current) {
            commentStore.createHubConnection(projectId)
            created.current =true;
        }
        return () => {
            commentStore.stopHubConnection();
            commentStore.comments = [];
        }
    },[projectId, commentStore])

    return {
        commentStore
    }
}