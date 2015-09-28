window.ChaiBioTech.ngApp.service 'AmplificationChartHelper', [
  'SecondsDisplay'
  '$filter'
  (SecondsDisplay, $filter) ->

    @chartConfig = ->
      config =
        axes:
          x:
            min: 0
            max: 10
            key: 'cycle_num'
            ticks: 8
          y:
            min: 0
            ticks: 10
            ticksFormatter: (y) ->
              "#{$filter('round')(y/1000, 1)}k"
        margin:
          left: 70
        series: [
        ]
        lineMode: 'basis'
        thickness: '2px'
        tension: 0.7
        tooltip:
          mode: 'none'
        # tooltip:
        #   mode: 'scrubber'
        #   formatter: (x, y, series) ->
        #     "cycle: #{x} | calibration: #{$filter('round')(y/1000, 1)}k"
        drawLegend: false
        drawDots: false
        hideOverflow: false

      config

    @neutralizeData = (fluorescence_data) ->
      neutralized_data = []

      paddData = cycle_num: 0
      for i in [0..15] by 1
        paddData["well_#{i}"] = 0

      neutralized_data.push paddData

      # get max cycle
      max_cycle = 0
      for datum in fluorescence_data by 1
        max_cycle = if datum.fluorescence_datum.cycle_num > max_cycle then datum.fluorescence_datum.cycle_num else max_cycle

      for i in [1..max_cycle] by 1
        data_by_cycle = _.select fluorescence_data, (datum) ->
          datum.fluorescence_datum.cycle_num is i

        data = cycle_num: i
        for datum in data_by_cycle by 1
          data["well_#{datum.fluorescence_datum.well_num}"] = datum.fluorescence_datum.calibrated_value

        neutralized_data.push data

      neutralized_data

    # @getGreatestCalibration = (fluorescence_data) ->
    #   data = []
    #   for datum in fluorescence_data by 1
    #     data.push datum.fluorescence_datum.calibrated_value

    #   Math.max.apply Math, data

    return
]