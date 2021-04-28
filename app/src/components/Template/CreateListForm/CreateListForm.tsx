import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { useCreateList, useEditList } from '@hooks/useList';
import uploadImage from '@utils/upload';
import Button from '@components/Elements/Button';
import Input, { TextArea } from '@components/Elements/Input';
import Text from '@components/Elements/Text';
import { CreateListInputs } from '$types/inputs';
import { Form, Row, FileInput, ImageBox, Label, Types } from './CreateListForm.styles';
import { IList } from '$types/entities';

interface CreateListProps {
  list?: IList;
}

const types = ['movies', 'animes', 'travel', 'books', 'others'];

const CreateListForm: React.FC<CreateListProps> = ({ list }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [type, setType] = useState(list?.type || 'movies');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState('');
  const { control, handleSubmit, formState } = useForm<CreateListInputs>({
    mode: 'onChange',
    defaultValues: {
      name: list?.name || '',
      description: list?.description || '',
    },
  });
  const [createList, { list: resData }] = useCreateList();
  const [editList, { list: updatedList }] = useEditList();

  useEffect(() => {
    if (resData) {
      router.push(`/create_list/items/${resData.id}`);
    }
  }, [resData]);

  useEffect(() => {
    if (updatedList) {
      queryClient.setQueryData(['list', updatedList.id], updatedList);
    }
  }, [updatedList]);

  const handleTypeClick = (value: string) => {
    setType(value);
  };

  const onSubmit = async (values: CreateListInputs) => {
    setIsLoading(true);
    if (file) {
      const upload = await uploadImage(file);
      if (upload.error) {
        setError(upload.error.message);
      }
      if (upload.image) {
        if (list) {
          await editList({
            listId: list.id,
            ...values,
            type,
            image: upload.image?.url,
          });
        } else {
          await createList({
            ...values,
            type,
            image: upload.image?.url,
          });
        }
      }
    } else if (list) {
      await editList({
        listId: list.id,
        ...values,
        type,
      });
    }
    setIsLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
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
          render={(props) => (
            <Input label='Name' placeholder='List name' {...props.field} />
          )}
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
              {...props.field}
              rows={5}
              label='Description'
              placeholder='List Description'
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
          <FileInput onChange={handleFileChange} id='image' type='file' name='image' />
          <ImageBox>
            {list || imageUrl ? (
              <img alt='List' src={list?.image || imageUrl} />
            ) : (
              'Choses list image'
            )}
          </ImageBox>
        </Label>
      </Row>
      {error && <Text status='danger'>{error}</Text>}
      <Row flex>
        <Button
          loading={isLoading}
          disabled={!formState.isValid || (!list && !file) || isLoading}
          type='submit'
        >
          {list ? 'Save' : 'create new list'}
        </Button>
      </Row>
    </Form>
  );
};

export default CreateListForm;
