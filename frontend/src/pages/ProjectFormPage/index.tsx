import React, { useState, useEffect } from "react";
import { Input, Button, Row, Col, message, Upload, Form } from "antd";
import { useForm } from "react-hook-form";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Title from "antd/lib/typography/Title";
import {
  ProjectResourceApi,
  ProjectDTO,
  UpdateUsingPUT2Request,
  CreateNewUsingPOST2Request,
} from "cloudsourced-api";
import { api } from "../../core/api";
import { RouteComponentProps } from "react-router";

import noImage from "../../assets/noimage.png";
import * as yup from "yup";

interface IRouterParams {
  projectId?: string;
}
const validationSchema = yup.object().shape({
  projectName: yup.string().required("Name is a required field"),
  description: yup.string().required("Description is a required field"),
});

interface IValues {
  projectName: string;
  description: string;
}
interface IProps extends RouteComponentProps<IRouterParams> {}

const ProjectFormPage: React.FC<IProps> = (props) => {
  let isEditing = false;
  if (Number(props.match.params.projectId)) {
    isEditing = true;
  } else {
    isEditing = false;
  }

  const projectId = Number(props.match.params.projectId);

  useEffect(() => {
    if (isEditing) {
      (async () => {
        const result = await new ProjectResourceApi(
          api.config
        ).getOneByIdUsingGET2({
          id: projectId,
        });
        if (result.name) setValue("projectName", result.name!);
        if (result.description) setValue("description", result.description!);
        if (result.image) setImage(result.image!);
        // setProject(fromLoaded(result));
      })();
    }
    // eslint-disable-next-line
  }, [projectId]);

  const { handleSubmit, errors, setValue, register, formState } = useForm({
    validationSchema,
  });

  const { isSubmitting } = formState;

  const [image, setImage] = useState("");

  const getBase64 = (image: Blob) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImage(reader.result as string);
    });
    reader.readAsDataURL(image);
  };

  const postImage = async (image: string): Promise<string> => {
    image = image.split("base64,")[1];
    const url = "https://api.imgur.com/3/image";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Client-ID 2b1eae61348c066",
      },
      body: JSON.stringify({
        image,
        type: "base64",
      }),
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      return data!.data!.link;
    } catch (e) {
      errorMessage();
      return "";
    }
  };

  const handleProject = async (data: any) => {
    const project: ProjectDTO = {
      description: data.description,
      name: data.projectName,
      image: "", //await postImage(image),
    };
    if (!isEditing) {
      const params: CreateNewUsingPOST2Request = {
        projectDTO: project,
      };
      loadMessage();
      try {
        const response = await new ProjectResourceApi(
          api.config
        ).createNewUsingPOST2(params);
        successMessage();
        props.history.push(`/projects/${response.id}`);
      } catch (error) {
        errorMessage();
      }
    } else {
      const updateParams: UpdateUsingPUT2Request = {
        id: projectId,
        dto: {
          name: data.projectName,
          description: data.description,
          image: await postImage(image),
        },
      };

      loadMessage();
      try {
        const updateResponse = await new ProjectResourceApi(
          api.config
        ).updateUsingPUT2(updateParams);
        successMessage();
        props.history.push(`/projects/${updateResponse.id}`);
      } catch (error) {
        errorMessage();
      }
    }
  };

  const successMessage = () => {
    message.success({
      content: isEditing
        ? "Project is updated succesfully!"
        : "Project is created succesfully!",
      key: "updatableKey",
      duration: 2,
    });
  };

  const loadMessage = () => {
    message.loading({ content: "Saving project...", key: "updatableKey" });
  };

  const errorMessage = () => {
    message.error({
      content: "Something went wrong",
      key: "updatableKey",
      duration: 2,
    });
  };
  useEffect(() => {
    register({ name: "projectName" });
    register({ name: "description" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <DefaultLayout>
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <div className="Grid" style={{ padding: 20 }}>
          <Row justify="center" gutter={[24, 24]}>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <Title>{isEditing ? "Edit" : "Create"}</Title>
              <Form>
                <Form.Item
                  label="Project name"
                  validateStatus={
                    errors.projectName !== undefined ? "error" : undefined
                  }
                  help={
                    errors.projectName !== undefined
                      ? errors.projectName.message
                      : undefined
                  }
                >
                  <Input
                    name="projectName"
                    onChange={(ev) => setValue("projectName", ev.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Description"
                  validateStatus={
                    errors.description !== undefined ? "error" : undefined
                  }
                  help={
                    errors.description !== undefined
                      ? errors.description.message
                      : undefined
                  }
                >
                  <Input
                    name="description"
                    onChange={(ev) => setValue("description", ev.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    accept=".jpg, .jpeg, .png"
                    onChange={(event) =>
                      getBase64(event.file.originFileObj as Blob)
                    }
                  >
                    <img
                      src={image ? image : noImage}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handleSubmit(handleProject)}
                    disabled={isSubmitting}
                    block
                  >
                    {isEditing ? "Update" : "Submit"}
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default ProjectFormPage;
