import React from 'react';
import {
  DefaultOptions,
  SubmissionPart
} from '../../../../../electron-app/src/submission/interfaces/submission-part.interface';
import { FileSubmissionSectionProps } from '../interfaces/file-submission-section.interface';
import TagInput from '../form-components/TagInput';
import { Form, Input, Radio } from 'antd';

export default class DefaultFormSection extends React.Component<
  FileSubmissionSectionProps<DefaultOptions>
> {
  handleChange(fieldName: string, { target }) {
    const part: SubmissionPart<DefaultOptions> = JSON.parse(JSON.stringify(this.props.part));
    part.data[fieldName] = target.value;
    this.props.onUpdate(part);
  }

  handleTagChange(update: any) {
    const part: SubmissionPart<DefaultOptions> = JSON.parse(JSON.stringify(this.props.part));
    part.data.tags = update;
    this.props.onUpdate(part);
  }

  render() {
    const { data } = this.props.part;
    return (
      <div>
        <Form.Item label="Title">
          <Input defaultValue={data.title} onBlur={this.handleChange.bind(this, 'title')} />
        </Form.Item>
        <Form.Item label="Rating" required={true}>
          <Radio.Group
            onChange={this.handleChange.bind(this, 'rating')}
            defaultValue={data.rating}
            buttonStyle="solid"
          >
            <Radio.Button value="general">General</Radio.Button>
            <Radio.Button value="mature">Mature</Radio.Button>
            <Radio.Button value="adult">Adult</Radio.Button>
            <Radio.Button value="extreme">Extreme</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <TagInput
          onChange={this.handleTagChange.bind(this)}
          defaultValue={data.tags}
          label="Default Tags"
          hideExtend={true}
        />
      </div>
    );
  }
}