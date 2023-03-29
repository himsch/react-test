import { render, screen } from '@testing-library/react';
import { Route, useParams } from 'react-router-dom';
import SearchHeader from '../SearchHeader/SearchHeader';
import { withRouter } from '../../tests/utils';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

describe('SearchHeader', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<SearchHeader />} />)
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('특정한 경로에 왔을때 입력폼에 검색어가 있는지', () => {
    render(
      withRouter(<Route path="/:keyword" element={<SearchHeader />} />, '/bts')
    );
    expect(screen.getByDisplayValue('bts')).toBeInTheDocument();
  });

  it('입력폼에서 키워드를 입력 후 form 서밋이 발생했을 때 경로 이동이 되는지', () => {
    const searchKeyword = 'fake';
    render(
      withRouter(
        <>
          <Route path="/home" element={<SearchHeader />} />
          <Route
            path={`/videos/${searchKeyword}`}
            element={<p>{`Search result for ${searchKeyword}`}</p>}
          />
        </>,
        '/home'
      )
    );

    const searchButton = screen.getByRole('button');
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, searchKeyword);
    userEvent.click(searchButton);

    expect(
      screen.getByText(`Search result for ${searchKeyword}`)
    ).toBeInTheDocument();
  });
});
