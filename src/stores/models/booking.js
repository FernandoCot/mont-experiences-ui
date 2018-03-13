import { Connect, mix } from 'fronto-connect';
import scopes from './scopes';
import { action } from 'mobx';

class Booking extends Connect {
    namespace = 'v1';
    resource = 'bookings';

    @action getStatusName(){
        if(!this.selected){
            return null;
        }
        const status = ['',
                        'Aguardando confirmação', //1
                        'Confirmado', //2 
                        'Realizado', //3
                        'Cancelado pelo viajante', //4
                        'Cancelado pelo provedor da experiência', //5
                        'Agendamento não aceito pelo provedor de experiência', //6
                        'Agendamento não aprovado' //7
                    ];
        return status[this.selected.status];
    }
}

mix(Booking, scopes.readable);
mix(Booking, scopes.writable);

export default Booking;