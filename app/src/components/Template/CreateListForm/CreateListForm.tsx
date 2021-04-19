import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useCreateList } from '@hooks/useList';
import uploadImage from '@utils/upload';
import Button from '@components/Elements/Button';
import Input, { TextArea } from '@components/Elements/Input';
import Text from '@components/Elements/Text';
import { CreateListInputs } from '$types/inputs';
import { Form, Row, FileInput, ImageBox, Label, Types } from './CreateListForm.styles';

const types = ['movies', 'animes', 'travel', 'books', 'others'];

const CreateListForm = () => {
  const [type, setType] = useState('movies');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState,
    setValue,
    register,
  } = useForm<CreateListInputs>({
    mode: 'onChange',
  });
  const [createList, { list }] = useCreateList();

  useEffect(() => {
    if (list) {
      router.push(`/create_list/items/${list.id}`);
    }
  }, [list]);
  const handleTypeClick = (value: string) => {
    setType(value);
  };

  const onSubmit = async (values: CreateListInputs) => {
    const { image, ...rest } = values;
    if (image) {
      setIsLoading(true);
      const upload = await uploadImage(image as File);
      if (upload.error) {
        setError(upload.error.message);
      }
      if (upload.image) {
        await createList({
          ...rest,
          type,
          image: upload.image?.url,
        });
      }
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setValue('image', e.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Label>List Type</Label>
        <Types>
          {types.map((el) => (
            <Button
              type='button'
              onClick={() => handleTypeClick(el)}
              status={type === el ? 'primary' : 'default'}
              key={el}
            >
              {el}
            </Button>
          ))}
        </Types>
      </Row>
      <Row>
        <Controller
          render={(props) => <Input label='Name' placeholder='List name' {...props} />}
          control={control}
          name='name'
          defaultValue=''
          rules={{ required: true }}
        />
      </Row>
      <Row>
        <Controller
          render={(props) => (
            <TextArea
              rows={5}
              label='Description'
              placeholder='List Description'
              {...props}
            />
          )}
          control={control}
          name='description'
          defaultValue=''
          rules={{ required: true }}
        />
      </Row>
      <Row>
        <Label htmlFor='image'>
          Image
          <Controller
            render={() => (
              <FileInput
                {...register('image')}
                onChange={handleFileChange}
                id='image'
                type='file'
              />
            )}
            name='image'
            rules={{ required: true }}
            control={control}
            defaultValue=''
          />
          <ImageBox>
            {imageUrl ? <img alt='List' src={imageUrl} /> : 'Choses list image'}
          </ImageBox>
        </Label>
      </Row>
      {error && <Text status='danger'>{error}</Text>}
      <Row flex>
        <Button
          loading={isLoading}
          disabled={!formState.isValid || isLoading}
          type='submit'
        >
          create new list
        </Button>
      </Row>
    </Form>
  );
};

export default CreateListForm;
