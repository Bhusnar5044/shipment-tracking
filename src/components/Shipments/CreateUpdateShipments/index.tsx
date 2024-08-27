import Button from '@/components/common/Button';
import DatePicker from '@/components/common/DatePicker';
import { SelectOption } from '@/components/common/OptionContainer/types';
import SingleSelect from '@/components/common/SingleSelect';
import { SingleSelectOptionEvent } from '@/components/common/SingleSelect/types';
import TextField from '@/components/common/TextField';
import { TextFieldEventType } from '@/components/common/TextField/types';
import { toast } from '@/components/common/Toast';
import Typography from '@/components/common/Typography';
import { keyPaths } from '@/constants/globalNavItems';
import { shipmentStatusOptions } from '@/constants/selectOptions';
import { useUpdateShipmentPostMutation } from '@/store/services';
import { useGetCustomerIdsQuery } from '@/store/services/customerApi';
import { useGetShipmentDetailsQuery } from '@/store/services/shipmentApi';
import { IShipment } from '@/store/services/shipmentApi/types';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const formInitialState: Partial<IShipment> = {
  customerId: '',
  origin: '',
  destination: '',
  currentStatus: 'Pending',
  containerNumbers: [],
  shippingAgent: '',
  cargoDetails: {
    description: '',
    weight: 0,
    volume: 0,
  },
};

const CreateUpdateShipment: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const [skip, setSkip] = useState(true);
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<IShipment>>(formInitialState);

  const { data } = useGetShipmentDetailsQuery({ id }, { skip });

  const [updateShipmentPost, { isLoading }] = useUpdateShipmentPostMutation();

  const { data: customerIds } = useGetCustomerIdsQuery({});

  const customerIdsOptions: SelectOption[] = useMemo(
    () => customerIds?.map((item) => ({ label: item.email, value: item.email })) ?? [],
    [customerIds]
  );

  useEffect(() => {
    console.log({ id });
    if (id) setSkip(false);
  }, [id]);

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  const handleChange = (e: TextFieldEventType) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCargoDetailsChange = (e: TextFieldEventType) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      cargoDetails: {
        ...prev?.cargoDetails,
        [name]: value,
      },
    }));
  };

  const handleDateChange = (value: Date, name: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (val: SingleSelectOptionEvent) => {
    const { name, option } = val;
    setForm((prev) => ({
      ...prev,
      [name]: option?.value as string,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await updateShipmentPost({ _id: id ?? '', ...form });
    console.log({ response });
    if (response) {
      toast('Shipment created successfully');
      navigate(keyPaths.shipments);
    }
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
            label="Select customerId"
            name="customerId"
            value={form.customerId}
            options={customerIdsOptions}
            onChange={handleSelectChange}
            fullWidth
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField variant="outlined" label="Origin" type="text" name="origin" value={form.origin} fullWidth onChange={handleChange} required />
          <TextField
            variant="outlined"
            label="Destination"
            type="text"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            fullWidth
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
            fullWidth
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DatePicker
            size="M"
            dateType="estimatedDeliveryDate"
            label="Estimated Delivery Date"
            name="estimatedDeliveryDate"
            date={form.estimatedDeliveryDate}
            fullWidth
            onChange={handleDateChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            variant="outlined"
            label="Container Numbers"
            type="text"
            name="containerNumbers"
            value={form?.containerNumbers?.join(', ') ?? ''}
            onChange={(e) => setForm((prev) => ({ ...prev, containerNumbers: e.target.value.split(', ') }))}
            fullWidth
            required
          />
          <TextField
            variant="outlined"
            label="Cargo Description"
            type="text"
            name="description"
            value={form?.cargoDetails?.description}
            onChange={handleCargoDetailsChange}
            required
            fullWidth
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            variant="outlined"
            label="Cargo weight in KGs"
            type="num"
            name="weight"
            value={form?.cargoDetails?.weight}
            onChange={handleCargoDetailsChange}
            required
            fullWidth
          />
          <TextField
            variant="outlined"
            label="Cargo volume in cubic"
            type="num"
            name="volume"
            value={form?.cargoDetails?.volume}
            onChange={handleCargoDetailsChange}
            required
            fullWidth
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            variant="outlined"
            label="Shipping Agent"
            type="text"
            name="shippingAgent"
            value={form.shippingAgent}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <Button isLoading={isLoading} type="submit" className="mt-4 self-start">
          {id ? 'Update Shipment' : 'Create Shipment'}
        </Button>
      </form>
    </div>
  );
};

export default CreateUpdateShipment;
