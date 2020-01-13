import React from 'react';
import { SubmissionType } from '../../shared/enums/submission-type.enum';
import { SubmissionLog } from '../../../../electron-app/src/submission/log/interfaces/submission-log.interface';
import SubmissionLogService from '../../services/submission-log.service';
import { List, Button, Icon, Typography } from 'antd';

interface Props {
  type: SubmissionType;
}

interface State {
  logs: SubmissionLog[];
  loading: boolean;
}

export default class SubmissionLogs extends React.Component<Props, State> {
  state: State = {
    logs: [],
    loading: false
  };

  constructor(props: Props) {
    super(props);
    this.loadLogs();
  }

  loadLogs() {
    this.setState({ loading: true });
    SubmissionLogService.getLogs(this.props.type).then(logs =>
      this.setState({ logs, loading: false })
    );
  }

  render() {
    return (
      <List
        itemLayout="vertical"
        loading={this.state.loading}
        dataSource={this.state.logs}
        header={
          <div className="text-right">
            <Button onClick={this.loadLogs.bind(this)} disabled={this.state.loading}>
              <Icon type="redo" />
            </Button>
          </div>
        }
        renderItem={item => (
          <List.Item
            key={item._id}
            actions={[
              <span className="text-link">Create Submission From Log</span>,
              <span className="text-link">Download</span>
            ]}
          >
            <List.Item.Meta
              title={item.submission.title}
              description={<div>Posted at {new Date(item.created).toLocaleString()}</div>}
            >
              <div className="flex">
                <div className="flex-1">
                  <Typography.Text>
                    <ul>
                      {item.parts
                        .filter(p => p.part.postStatus === 'SUCCESS')
                        .sort((a, b) => a.part.website.localeCompare(b.part.website))
                        .map(p => (
                          <li>
                            <span className="mr-1">{p.part.website}</span>
                            {p.part.postedTo ? <span>(p.part.postedTo)</span> : null}
                          </li>
                        ))}
                    </ul>
                  </Typography.Text>
                </div>
                <div className="flex-1">
                  <Typography.Text type="danger">
                    <ul>
                      {item.parts
                        .filter(p => p.part.postStatus !== 'SUCCESS')
                        .sort((a, b) => a.part.website.localeCompare(b.part.website))
                        .map(p => (
                          <li>
                            <span className="mr-1">{p.part.website}</span>
                          </li>
                        ))}
                    </ul>
                  </Typography.Text>
                </div>
              </div>
            </List.Item.Meta>
          </List.Item>
        )}
      />
    );
  }
}