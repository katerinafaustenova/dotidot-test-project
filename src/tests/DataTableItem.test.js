import { render } from "@testing-library/react";
import { formatDistance } from "date-fns";
import renderer from "react-test-renderer";
import DataTableItem from "../components/DataTableItem";

describe("DataTableItem", () => {
  const dataProvider = [
    { description: "no props", data: {} },
    {
      description: "all props",
      data: {
        dataSource: {
          id: "1",
          name: "Test Name",
          archived: false,
          createdAt: "2023-11-28",
          updatedAt: "2023-12-01",
          icon: "icon",
          itemsCount: 5,
          lastImport: "2023-12-01",
        },
        column: "archived",
        editMode: false,
        archived: "false",
        setArchived: jest.fn(),
      },
    },
    {
      description: "updatedAt prop empty",
      data: {
        dataSource: {
          id: "1",
          name: "",
          archived: false,
          createdAt: "2023-11-28",
          updatedAt: "",
          icon: "icon",
          itemsCount: 5,
          lastImport: "2023-12-01",
        },
        column: "updatedAt",
        editMode: false,
        archived: "false",
        setArchived: jest.fn(),
      },
    },
    {
      description: "createdAt prop missing",
      data: {
        dataSource: {
          id: "1",
          name: "",
          archived: false,
          updatedAt: "",
          icon: "icon",
          itemsCount: 5,
          lastImport: "2023-12-01",
        },
        column: "createdAt",
        editMode: false,
        archived: "false",
        setArchived: jest.fn(),
      },
    },
    {
      description: "column prop missing",
      data: {
        dataSource: {
          id: "1",
          name: "Test Name",
          archived: false,
          updatedAt: "",
          icon: "icon",
          itemsCount: 5,
          lastImport: "2023-12-01",
        },
        editMode: false,
        archived: "false",
        setArchived: jest.fn(),
      },
    },
    {
      description: "whole dataSource prop missing",
      data: {
        column: "lastImport",
        editMode: false,
        archived: "false",
        setArchived: jest.fn(),
      },
    },
    {
      description: "different itemsCount prop type",
      data: {
        dataSource: {
          id: "1",
          name: 12345,
          archived: false,
          updatedAt: "",
          icon: "icon",
          itemsCount: "10",
          lastImport: "2023-12-01",
        },
        column: "itemsCount",
        editMode: false,
        archived: "false",
        setArchived: jest.fn(),
      },
    },
  ];

  dataProvider.forEach((props) => {
    it(`renders correctly with ${props.description}`, () => {
      const tree = renderer.create(<DataTableItem {...props.data} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});

describe("getItemData fn", () => {
  const dataProvider = [
    {
      description: "full text string format",
      data: {
        dataSource: {
          updatedAt: "2023-12-01T17:41:18+01:00",
        },
      },
    },
    {
      description: "ISO format",
      data: {
        dataSource: {
          updatedAt: "2023-12-01",
        },
      },
    },
    {
      description: "short date format",
      data: {
        dataSource: {
          updatedAt: "12/01/2023",
        },
      },
    },
    {
      description: "long date format",
      data: {
        dataSource: {
          updatedAt: "01 Dec 2023",
        },
      },
    },
  ];

  dataProvider.forEach((props) => {
    it(`renders formatted updatedAt date correctly with ${props.description}`, () => {
      const { getByText } = render(
        <table>
          <tbody>
            <tr>
              <DataTableItem
                dataSource={props.data.dataSource}
                column="updatedAt"
              />
            </tr>
          </tbody>
        </table>
      );

      const updatedAtDate = new Date(props.data.dataSource.updatedAt);
      const updatedAtDistance =
        formatDistance(updatedAtDate, new Date()) + " ago";

      expect(getByText(updatedAtDistance)).toBeInTheDocument();
    });
  });
});
