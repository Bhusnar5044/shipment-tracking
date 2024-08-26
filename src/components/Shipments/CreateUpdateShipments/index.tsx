import Button from '@/components/common/Button';
import DatePicker from '@/components/common/DatePicker';
import { SelectOption } from '@/components/common/OptionContainer/types';
import SingleSelect from '@/components/common/SingleSelect';
import { SingleSelectOptionEvent } from '@/components/common/SingleSelect/types';
import TextField from '@/components/common/TextField';
import { TextFieldEventType } from '@/components/common/TextField/types';
import Typography from '@/components/common/Typography';
import { shipmentStatusOptions } from '@/constants/selectOptions';
import { ShipmentStatus } from '@/constants/types';
import { useUpdateShipmentPostMutation } from '@/store/services';
import { IShipment } from '@/store/services/createUpdateShipmentApi/types';
import { useGetCustomerIdsQuery } from '@/store/services/customerIdsApi';
import { useGetShipmentDetailsQuery } from '@/store/services/shipmentDetailsApi';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const formInitialState:Partial<IShipment> = {
  customer: '',
  origin: '',
  destination: '',
  currentStatus: 'Pending',
  containerNumbers: [],
  shippingAgent: '',
}

const CreateUpdateShipment: React.FC = () => {
  const { id='' } = useParams<{ id: string }>();
  const [skip, setSkip] = useState(true);
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<IShipment>>(formInitialState);

  const {data} = useGetShipmentDetailsQuery({id}, {skip})

  const [updateShipmentPost] = useUpdateShipmentPostMutation()

  const {data: customerIds} = useGetCustomerIdsQuery({});

  const customerIdsOptions:SelectOption[] = useMemo(()=> customerIds?.map(item => ({label: item.email, value: item._id ?? item.email})) ?? [],[customerIds])

  useEffect(()=>{
    if(id) setSkip(prev => !prev) ;
  },[id])

  useEffect(() => {
    if (data) {
      setForm({
        shipmentId: data.shipmentId,
        origin: data.origin,
        destination: data.destination,
        currentStatus: data.currentStatus as ShipmentStatus,
        containerNumbers: data.containerNumbers,
        shippingAgent: data.shippingAgent,
      });
    }
  }, [data]);

  const handleChange = (e: TextFieldEventType) => {
    const {name, value} = e.target;
    setForm((prev)=> ({ ...prev, [name]: value }));
  };

  const handleDateChange = (value: Date, name:string) => {
    setForm(prev => ({...prev, [name]: value}))
  }

  const handleSelectChange = (val: SingleSelectOptionEvent) => {
    const {name,option} = val;
    setForm((prev)=>({
      ...prev,
      [name]: option?.value as string
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      await updateShipmentPost({_id: id ?? '', ...form});
    navigate('/shipments');
  };

  return (
    <div className="p-8">
      <Typography variant="h3" className="mb-6">
        {id ? 'Edit Shipment' : 'Create Shipment'}
      </Typography>
      <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-4 p-8 bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SingleSelect
    variant="outlined"
            label="Select Customer"
            name="customer"
            value={form.shipmentId}
            options={customerIdsOptions}
            onChange={handleSelectChange}
            required
          />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <TextField
    variant="outlined"
            label="Origin"
            type="text"
            name="origin"
            value={form.origin}
            onChange={handleChange}
            required
          />
          <TextField
    variant="outlined"
            label="Destination"
            type="text"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SingleSelect
    variant="outlined"
            label="Current Status"
            name="currentStatus"
            value={form.currentStatus}
            options={shipmentStatusOptions}
            onChange={handleSelectChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DatePicker
            size='M'
            dateType='estimatedDeliveryDate'
            label='Estimated Delivery Date'
            name="estimatedDeliveryDate"
            date={form.estimatedDeliveryDate}
            onChange={handleDateChange}
          />
        </div>
          <TextField
    variant="outlined"
            label="Container Numbers"
            type="text"
            name="containerNumbers"
            value={form?.containerNumbers?.join(', ') ?? ''}
            onChange={(e) => setForm({ ...form, containerNumbers: e.target.value.split(', ') })}
            required
          />
          <TextField
    variant="outlined"
            label='Shipping Agent'
            type="text"
            name="shippingAgent"
            value={form.shippingAgent}
            onChange={handleChange}
            required
          />
        <Button
          type="submit"
          className='mt-4 self-start'
        >
          {id ? 'Update Shipment' : 'Create Shipment'}
        </Button>
      </form>
    </div>
  );
};

export default CreateUpdateShipment;
