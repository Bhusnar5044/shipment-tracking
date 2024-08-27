import Button from '@/components/common/Button';
import SingleSelect from '@/components/common/SingleSelect';
import { SingleSelectOptionEvent } from '@/components/common/SingleSelect/types';
import TextField from '@/components/common/TextField';
import { TextFieldEventType } from '@/components/common/TextField/types';
import { toast } from '@/components/common/Toast';
import Typography from '@/components/common/Typography';
import { countries } from '@/constants/selectOptions';
import { useUpdateCustomerPostMutation } from '@/store/services';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICustomer } from './types';

const initialFormState: Partial<ICustomer> = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  },
  password: 'changeme',
  role: 'Customer',
};

const CustomerOnboardingForm: React.FC = () => {
  const [form, setForm] = useState<Partial<ICustomer>>(initialFormState);
  const { id } = useParams();
  const [updateCustomerPost, { isLoading }] = useUpdateCustomerPostMutation();
  const handleChange = (e: TextFieldEventType) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: TextFieldEventType) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleCountryChange = (val: SingleSelectOptionEvent) => {
    const { name, option } = val;
    setForm((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: option?.value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateCustomerPost({ _id: id ?? '', ...form });
      if (response.data) toast(`Customer ${id ? 'Updated' : 'onboarded'} successfully!`);
      // Reset form fields
      setForm(initialFormState);
    } catch (error) {
      console.error('Error onboarding customer:', error);
      toast('There was an error onboarding the customer.');
    }
  };

  return (
    <div>
      <Typography variant="h3" className="mb-6">
        Customer Onboarding
      </Typography>
      <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-4 p-8 bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            variant="outlined"
            label="Company Name"
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            variant="outlined"
            label="Contact Name"
            type="text"
            name="contactName"
            value={form.contactName}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField fullWidth variant="outlined" label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
          <TextField fullWidth variant="outlined" label="Phone" type="tel" name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            fullWidth
            variant="outlined"
            label="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SingleSelect
            variant="outlined"
            label="Country"
            name="country"
            value={form.address?.country}
            onChange={handleCountryChange}
            options={countries}
            searchable
            hideExpandableIcon
            required
            fullWidth
          />
          <TextField
            variant="outlined"
            label="Street"
            type="text"
            name="street"
            value={form.address?.street}
            onChange={handleAddressChange}
            required
            fullWidth
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            fullWidth
            variant="outlined"
            label="City"
            type="text"
            name="city"
            value={form.address?.city}
            onChange={handleAddressChange}
            required
          />
          <TextField
            fullWidth
            variant="outlined"
            label="State"
            type="text"
            name="state"
            value={form.address?.state}
            onChange={handleAddressChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            variant="outlined"
            label="Zip Code"
            type="text"
            name="zipCode"
            value={form.address?.zipCode}
            onChange={handleAddressChange}
            required
            fullWidth
          />
        </div>
        <Button isLoading={isLoading} className="mt-4 self-start" type="submit">
          Onboard Customer
        </Button>
      </form>
    </div>
  );
};

export default CustomerOnboardingForm;
