/* eslint-disable prettier/prettier */
import * as Config from '../../ressources/setting.json';
const initialState={
    trip:{status:false,state:null},
    ride:{status:false,list:[]},
    contact:{status:false,list:[],rideAll:false,rideAccepted:false},
    user:{status:false,user:null,dashboard:false},
    ridePending:false,
    rideAll:false,
    rideAccepted:false,
    rideTransmission:false,
    rideContact:false,
    tripRequest:false,
    tripSum:{info:false,trips:false,request:false,value:null},
    bag:{receiver:false,trip:false},
    out:{id:0,status:false},
    message:{reference:0,status:false},
    badgeTrip:{count:0},
    search:{quit:false},
    dashboard:{countRider:0,countTrip:0,countRequest:0,valueRider:false,valueTrip:false,valueRequest:false}
}
const type=Config.APP;

export default function App(state=initialState,action){
    let nextState;

    switch (action.type) {
        case type.RIDE_ADD:
            nextState={
                ...state,
                ride:{status:false,list:action.value.list}
            }
            
            return nextState||state;
        case type.RIDE_UPDATE:
            nextState={
                ...state,
                ride:{status:false}
            }
            return nextState||state;
        case type.TRIP_ADD:
            nextState={
                ...state,
                trip:{status:true}
            }
            return nextState||state;
        case type.TRIP_UPDATE:
            nextState={
                ...state,
                trip:{
                    status:(action.value==false || action.value==true)?action.value:state.trip.status,
                    state:(action.state!=undefined && action.state!=null)?action.state:state.trip.state
                }
            }
            return nextState||state;
        case type.CONTACT_UPDATE:{
            nextState={
                ...state,
                contact:{
                    status:(action.value.status==true || action.value.status==false)?action.value.status:state.contact.status,
                    list:(action.value.list!=undefined && action.value.list!=null)?action.value.list:state.contact.list,
                    dashboard:action.dashboard,
                    //rideAll:(action.value.rideAll==true || action.value.rideAll==false)?action.value.rideAll:state.contact.rideAll,
                    //rideAll:(action.value.rideAccepted==true || action.value.rideAccepted==false)?action.value.rideAccepted:state.contact.rideAccepted,
                }
            }
            return nextState||state;
        }
        case type.CONTACT_ADD:{
            nextState={
                ...state,
                contact:{
                    status:true,
                    list:state.contact.list,
                }
            }
            return nextState||state;
        }
        case type.LOGIN:{
            nextState={
                ...state,
                user:{status:true,user:action.value}
            }
            return nextState||state;
        }
        case type.LOGOUT:{
            nextState={
                ...state,
                user:{status:false,user:{}}
            }
            return nextState||state;
        }
        case type.UPDATE_USER:{
            nextState={
                ...state,
                user:{status:true,user:action.value}
            }
            return nextState||state;
        }
        case type.RIDE.ALL:{
            nextState={
                ...state,
                rideAll:action.value
            }
            return nextState||state;
        }
        case type.RIDE.ACCEPTED:{
            nextState={
                ...state,
                rideAccepted:action.value
            }
            return nextState||state;
        }
        case type.RIDE.PENDING:{
            nextState={
                ...state,
                ridePending:action.value
            }
            return nextState||state;
        }
        case type.RIDE.TRANSMISSION:{
            nextState={
                ...state,
                rideTransmission:action.value
            }
            return nextState||state;
        }
        case type.TRIP.REQUEST:{
            nextState={
                ...state,
                tripRequest:action.value
            }
            return nextState||state;
        }
        case type.TRIP.SUM:{
            nextState={
                ...state,
                tripSum:{info:action.value.info,
                    trips:action.value.trips,
                    request:action.value.request,
                    value:action.value.value
                }
            }
            return nextState||state;
        }
        case type.BAG:{
            nextState={
                ...state,
                bag:{receiver:action.value.receiver,
                    trips:action.value.trips
                }
            }
            return nextState||state;
        }
        case type.TRIP.BADGE:{
            nextState={
                ...state,
                badgeTrip:{count:action.value}
            }
            return nextState||state;
        }
        case type.SEARCH:{
            nextState={
                ...state,
                search:{quit:action.value}
            }
            return nextState||state;
        }
        case type.DASHBOARD:{
            nextState={
                ...state,
                dashboard:{
                    valueRider:(action.valueRider==true || action.valueRider==false)?action.valueRider:state.dashboard.valueRider,
                    valueTrip:(action.valueTrip==true || action.valueTrip==false)?action.valueTrip:state.dashboard.valueTrip,
                    valueRequest:(action.valueRequest==true || action.valueRequest==false)?action.valueRequest:state.dashboard.valueRequest,
                    countRider:(action.countRider!=null && action.countRider!=undefined)?action.countRider:state.dashboard.countRider,
                    countTrip:(action.countTrip!=null && action.countTrip!=undefined)?action.countTrip:state.dashboard.countTrip,
                    countRequest:(action.countRequest!=null && action.countRequest!=undefined)?action.countRequest:state.dashboard.countRequest    
                }
            }
            return nextState||state;
        }
        case type.OUT:{
            nextState={
                ...state,
                out:{
                    id:(action.id>=0)?action.id:state.out.id,
                    status:(action.status==false || action.status==true)?action.status:state.out.status    
                }
            }
            return nextState||state;
        }
        case type.MESSAGE:{
            nextState={
                ...state,
                message:{
                    reference:(action.reference!=null && action.reference!=undefined)?action.reference:state.message.reference,
                    status:(action.status==false || action.status==true)?action.status:state.out.status    
                }
            }
            return nextState||state;
        }
    
        default:
            return state;
    }
}