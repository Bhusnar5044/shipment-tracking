import DataTable from '@/components/common/DataTable';
import RightSidePanel from '@/components/common/RightSidePanel';
import Tabs from '@/components/common/Tab';
import { closeSidePanel } from '@/store/features/sidePanel';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { FC, memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import SidePanelContent from './SidePanelContent';
import { ActionSection } from './filterContent/ActionSection';
import { FilterSection } from './filterContent/FilterSection';
import { Props } from './types';
import { useContent } from './useContent';
import { getTabContentColumns } from './utils';

export const TabTableTemplate: FC<Props> = memo(({ defaultTab, tabs, tabType, serviceApiKey, buttonComp }) => {
  const [paramData, setParamData] = useState<{ sidePanelParamId?: string; sidePanelParamKey?: string }>({});
  const { data: sidePanelData, sidePanelKey, isOpen } = useAppSelector((state) => state.sidePanel);
  const dispatch = useAppDispatch(),
    {
      data,
      selectedTab,
      size,
      queryParams,
      setQueryParams,
      // refetch,
      showMoreFilters,
      setShowMoreFilters,
      filtersApplied,
      setFiltersApplied,
      clearFilter,
      applyFilter,
      handleFilterChange,
      handleTabChange,
      filters,
    } = useContent(serviceApiKey, defaultTab, tabType ?? '') ?? {},
    onClose = useCallback(() => {
      dispatch(closeSidePanel());
      setParamData({});
    }, [dispatch]),
    [calcHeight, setCalcHeight] = useState(0);

  const columns = getTabContentColumns(serviceApiKey);

  const tabRef = useRef<HTMLDivElement>(null);
  const filterWrapperRef = useRef<HTMLDivElement>(null);
  const titleSectionRef = useRef<HTMLDivElement>(null);

  const sidePanelURLParamId = queryParams?.get('sidePanelItemId') ?? undefined;
  const sidePanelURLParamKey = queryParams?.get('sidePanelKey') ?? undefined;

  useEffect(() => {
    if (sidePanelURLParamId && sidePanelURLParamKey) {
      setParamData({ sidePanelParamId: sidePanelURLParamId, sidePanelParamKey: sidePanelURLParamKey });
      setQueryParams({ sidePanelKey: undefined, sidePanelItemId: undefined });
    }
  }, [setQueryParams, sidePanelURLParamId, sidePanelURLParamKey]);

  useLayoutEffect(() => {
    if (tabRef?.current) {
      const layoutHeaderHeight = 65;
      const middleSpacing = 40;
      let height = middleSpacing + layoutHeaderHeight + (tabRef.current?.children?.[0]?.clientHeight ?? 0);
      if (filterWrapperRef?.current) height += filterWrapperRef.current?.clientHeight ?? 0;
      if (titleSectionRef?.current) {
        const titleSectionHeight = titleSectionRef.current?.clientHeight ?? 0;
        height += titleSectionHeight;
      }
      setCalcHeight(height);
    }
  }, []);
  useEffect(() => {
    if (isOpen) {
      dispatch(closeSidePanel());
    }
  }, [selectedTab, isOpen, dispatch]);

  return (
    <div className="x-4 mb-10 w-screen lg:w-full lg:px-0" key={serviceApiKey}>
      <Tabs
        ref={tabRef}
        tabs={tabs}
        selectedTab={selectedTab}
        onClick={handleTabChange}
        actionSection={
          <ActionSection
            {...{
              serviceApiKey,
              clearFilter,
              filtersApplied,
              showMoreFilters,
              setShowMoreFilters,
              applyFilter,
              handleFilterChange,
              filters,
              buttonComp,
            }}
          />
        }
        filterSection={
          <FilterSection
            {...{
              queryParams,
              setQueryParams,
              serviceApiKey,
              showMoreFilters,
              filtersApplied,
              setFiltersApplied,
              clearFilter,
              applyFilter,
              filters,
              handleFilterChange,
            }}
          />
        }
        isSingleContent
        screenFit
      >
        <DataTable
          columns={columns}
          data={data?.data ?? []}
          pageSize={size}
          totalCount={data?.totalCount ?? 0}
          // onDownload={onDownload}
          // disableDownload={!disableDownload}
          calcHeight={calcHeight}
        />
        <RightSidePanel
          isOpen={sidePanelKey !== 'static_announcement' && (isOpen || !!(paramData.sidePanelParamId && paramData.sidePanelParamKey))}
          onClose={onClose}
          sidePanelData={sidePanelData}
          sidePanelKey={sidePanelKey}
        >
          {SidePanelContent(
            sidePanelKey || (paramData.sidePanelParamKey as string),
            sidePanelData
            // refetch,
            // paramData.sidePanelParamId ?? ""
          )}
        </RightSidePanel>
      </Tabs>
    </div>
  );
});

TabTableTemplate.displayName = 'TabTableTemplate';
