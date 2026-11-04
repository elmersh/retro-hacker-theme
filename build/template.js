'use strict';
// Theme structure (colors, tokenColors, semanticTokenColors) as a function of a
// resolved palette. NO raw hex here: every color comes from a palette role
// (build/roles.js), optionally with alpha via a(role, 'AA'). The only literals
// allowed are the universal BLACK (transparent / opacity mask).
const { alpha: a } = require('./lib/color');
const { FONT_STYLE_DEFAULTS } = require('./roles');

const BLACK = '#000000';

// 'bold italic' -> { bold: true, italic: true } (semantic token style flags)
function flags(fontStyle) {
  const out = {};
  for (const f of String(fontStyle || '').split(/\s+/).filter(Boolean)) out[f] = true;
  return out;
}
// Join TextMate fontStyle fragments without duplicates: join('bold', 'italic') -> 'bold italic'
function join(...parts) {
  const seen = [];
  for (const f of parts.join(' ').split(/\s+/).filter(Boolean)) if (!seen.includes(f)) seen.push(f);
  return seen.join(' ');
}
// Semantic rule: plain color if no flags, otherwise { foreground, ...flags }
const sem = (fg, fontStyle) => {
  const fl = flags(fontStyle);
  return Object.keys(fl).length ? { foreground: fg, ...fl } : fg;
};

module.exports = function template(palette) {
  const p = palette.colors;
  const fs = { ...FONT_STYLE_DEFAULTS, ...(palette.fontStyle || {}) };

  // ───────────────────────── colors ─────────────────────────
  const sections = [];
  const sec = (title, obj) => sections.push({ title, obj });

  sec('Base: texto, foco, sombras (glow del acento)', {
    'foreground': p.uiAccent,
    'descriptionForeground': p.uiText,
    'disabledForeground': p.textDisabled,
    'errorForeground': p.error,
    'focusBorder': p.focus,
    'icon.foreground': p.uiAccent,
    'selection.background': a(p.selection, '40'),
    'widget.border': p.focus,
    'widget.shadow': a(p.uiAccent, '26'),
    'sash.hoverBorder': p.uiAccent,
    'scrollbar.shadow': a(p.uiAccent, '1A'),
    'textLink.foreground': p.link,
    'textLink.activeForeground': p.linkActive,
    'textBlockQuote.background': p.bg3,
    'textBlockQuote.border': p.focus,
    'textCodeBlock.background': p.bg3,
    'textPreformat.background': a(p.uiAccent, '12'),
    'textPreformat.foreground': p.markupCode,
    'textSeparator.foreground': p.border,
    'toolbar.hoverBackground': a(p.uiAccent, '30'),
    'toolbar.activeBackground': a(p.uiAccent, '50'),
    'actionBar.toggledBackground': a(p.uiAccent, '30'),
    'progressBar.background': p.uiAccent,
    'badge.background': p.focus,
    'badge.foreground': p.onAccent,
    'profileBadge.background': p.bg4,
    'profileBadge.foreground': p.uiAccent,
  });

  sec('Editor: fondo, cursor, linea activa (scanline CRT)', {
    'editor.background': p.bg0,
    'editor.foreground': p.text,
    'editorCursor.foreground': p.cursor,
    'editorCursor.background': p.onAccent,
    'editorMultiCursor.primary.foreground': p.cursor,
    'editorMultiCursor.secondary.foreground': p.uiAccentCool,
    'editor.lineHighlightBackground': p.lineHighlight,
    'editor.lineHighlightBorder': p.lineHighlightBorder,
    'editorLineNumber.foreground': p.lineNumber,
    'editorLineNumber.activeForeground': p.uiAccent,
    'editorLineNumber.dimmedForeground': p.guideStrong,
    'editor.foldBackground': a(p.uiAccent, '0D'),
    'editor.foldPlaceholderForeground': p.textDim,
    'editor.placeholder.foreground': p.textGhost,
    'editor.rangeHighlightBackground': a(p.uiAccent, '10'),
    'editor.compositionBorder': p.uiAccent,
    'editorRuler.foreground': a(p.uiAccent, '55'),
    'editorCodeLens.foreground': p.textDim,
    'editorLink.activeForeground': p.link,
    'editorWhitespace.foreground': p.guideStrong,
    'editorUnicodeHighlight.border': p.warning,
    'editorUnicodeHighlight.background': a(p.warning, '1A'),
    'editorUnnecessaryCode.opacity': a(BLACK, 'AA'),
  });

  sec('Editor: seleccion (selection) / find (findMatch) / word highlight (highlightRead lectura, highlightWrite escritura)', {
    'editor.selectionBackground': a(p.selection, '3A'),
    'editor.inactiveSelectionBackground': a(p.selection, '26'),
    'editor.selectionHighlightBackground': a(p.selection, '14'),
    'editor.selectionHighlightBorder': a(p.selection, '66'),
    'editor.wordHighlightBackground': a(p.highlightRead, '26'),
    'editor.wordHighlightStrongBackground': a(p.highlightWrite, '30'),
    'editor.wordHighlightTextBackground': a(p.highlightRead, '1A'),
    'editor.findMatchBackground': a(p.findMatch, '4D'),
    'editor.findMatchBorder': p.findMatch,
    'editor.findMatchHighlightBackground': a(p.findMatch, '26'),
    'editor.findMatchHighlightBorder': a(p.findMatch, '80'),
    'editor.findRangeHighlightBackground': a(p.uiAccent, '10'),
    'editor.hoverHighlightBackground': a(p.uiAccent, '18'),
    'editor.linkedEditingBackground': a(p.highlightWrite, '30'),
    'editor.snippetTabstopHighlightBackground': a(p.uiAccent, '30'),
    'editor.snippetFinalTabstopHighlightBorder': p.uiAccent,
    'searchEditor.findMatchBackground': a(p.findMatch, '26'),
    'searchEditor.findMatchBorder': a(p.findMatch, '80'),
  });

  sec('Brackets: ciclo bracket1 / bracket2 / bracket3 (nunca el color del texto)', {
    'editorBracketMatch.background': a(p.bracketMatch, '3D'),
    'editorBracketMatch.border': a(p.bracketMatch, '80'),
    'editorBracketHighlight.foreground1': p.bracket1,
    'editorBracketHighlight.foreground2': p.bracket2,
    'editorBracketHighlight.foreground3': p.bracket3,
    'editorBracketHighlight.foreground4': p.bracket1,
    'editorBracketHighlight.foreground5': p.bracket2,
    'editorBracketHighlight.foreground6': p.bracket3,
    'editorBracketHighlight.unexpectedBracket.foreground': p.error,
    'editorBracketPairGuide.activeBackground1': a(p.bracket1, '90'),
    'editorBracketPairGuide.activeBackground2': a(p.bracket2, '90'),
    'editorBracketPairGuide.activeBackground3': a(p.bracket3, '90'),
    'editorBracketPairGuide.activeBackground4': a(p.bracket1, '90'),
    'editorBracketPairGuide.activeBackground5': a(p.bracket2, '90'),
    'editorBracketPairGuide.activeBackground6': a(p.bracket3, '90'),
  });

  sec('Guias de indentacion', {
    'editorIndentGuide.background1': p.guide,
    'editorIndentGuide.activeBackground1': p.lineNumber,
  });

  sec('Diagnosticos: error / warning / info', {
    'editorError.foreground': p.error,
    'editorError.border': a(p.error, '60'),
    'editorError.background': a(p.error, '12'),
    'editorWarning.foreground': p.warning,
    'editorWarning.border': a(p.warning, '60'),
    'editorWarning.background': a(p.warning, '0D'),
    'editorInfo.foreground': p.info,
    'editorInfo.border': a(p.info, '60'),
    'editorHint.foreground': a(p.uiAccent, '90'),
    'editorHint.border': a(p.uiAccent, '40'),
    'problemsErrorIcon.foreground': p.error,
    'problemsWarningIcon.foreground': p.warning,
    'problemsInfoIcon.foreground': p.info,
    'editorMarkerNavigation.background': p.bg3,
    'editorMarkerNavigationError.background': p.error,
    'editorMarkerNavigationError.headerBackground': a(p.error, '1A'),
    'editorMarkerNavigationWarning.background': p.warning,
    'editorMarkerNavigationWarning.headerBackground': a(p.warning, '1A'),
    'editorMarkerNavigationInfo.background': p.info,
    'editorMarkerNavigationInfo.headerBackground': a(p.info, '1A'),
    'editorLightBulb.foreground': p.uiAccentWarm,
    'editorLightBulbAutoFix.foreground': p.uiAccentCool,
    'editorLightBulbAi.foreground': p.uiAccentAlt,
  });

  sec('Inlay hints, ghost text, blame, inline values', {
    'editorInlayHint.foreground': p.inlayHint,
    'editorInlayHint.background': a(p.bg3, '99'),
    'editorInlayHint.typeForeground': p.inlayHintType,
    'editorInlayHint.typeBackground': a(p.bg3, '99'),
    'editorInlayHint.parameterForeground': p.inlayHint,
    'editorInlayHint.parameterBackground': a(p.bg3, '99'),
    'editorGhostText.foreground': p.textGhost,
    'git.blame.editorDecorationForeground': p.textGhost,
    'editor.inlineValuesForeground': a(p.variable, 'B0'),
    'editor.inlineValuesBackground': a(p.selection, '14'),
  });

  sec('Sticky scroll', {
    'editorStickyScroll.background': p.bg0,
    'editorStickyScroll.border': p.borderDim,
    'editorStickyScroll.shadow': a(p.uiAccent, '30'),
    'editorStickyScrollGutter.background': p.bg0,
    'editorStickyScrollHover.background': p.bgHover,
  });

  sec('Gutter, overview ruler y minimap', {
    'editorGutter.background': p.bg0,
    'editorGutter.addedBackground': p.diffAdded,
    'editorGutter.modifiedBackground': p.modified,
    'editorGutter.deletedBackground': p.deleted,
    'editorGutter.foldingControlForeground': p.uiAccent,
    'editorOverviewRuler.border': p.borderDim,
    'editorOverviewRuler.addedForeground': a(p.diffAdded, '99'),
    'editorOverviewRuler.modifiedForeground': a(p.modified, '99'),
    'editorOverviewRuler.deletedForeground': a(p.deleted, 'B3'),
    'editorOverviewRuler.errorForeground': a(p.error, 'B3'),
    'editorOverviewRuler.warningForeground': a(p.warning, 'B3'),
    'editorOverviewRuler.infoForeground': a(p.info, 'B3'),
    'editorOverviewRuler.findMatchForeground': a(p.findMatch, 'B0'),
    'editorOverviewRuler.selectionHighlightForeground': a(p.selection, '99'),
    'editorOverviewRuler.wordHighlightForeground': a(p.highlightRead, '99'),
    'editorOverviewRuler.wordHighlightTextForeground': a(p.highlightRead, '66'),
    'editorOverviewRuler.wordHighlightStrongForeground': a(p.highlightWrite, 'CC'),
    'editorOverviewRuler.bracketMatchForeground': a(p.bracketMatch, '99'),
    'editorOverviewRuler.rangeHighlightForeground': a(p.uiAccentCool, '99'),
    'editorOverviewRuler.currentContentForeground': a(p.mergeCurrent, '80'),
    'editorOverviewRuler.incomingContentForeground': a(p.mergeIncoming, '80'),
    'editorOverviewRuler.commonContentForeground': a(p.mergeBase, '66'),
    'editorOverviewRuler.inlineChatInserted': a(p.diffAdded, '40'),
    'editorOverviewRuler.inlineChatRemoved': a(p.deleted, '40'),
    'minimap.errorHighlight': p.error,
    'minimap.warningHighlight': p.warning,
    'minimap.infoHighlight': p.info,
    'minimap.findMatchHighlight': a(p.findMatch, 'B0'),
    'minimap.selectionHighlight': a(p.selection, '80'),
    'minimap.selectionOccurrenceHighlight': a(p.selection, '50'),
    'minimapSlider.background': a(p.uiAccent, '33'),
    'minimapSlider.hoverBackground': a(p.uiAccent, '50'),
    'minimapSlider.activeBackground': a(p.uiAccent, '70'),
    'minimapGutter.addedBackground': p.diffAdded,
    'minimapGutter.modifiedBackground': p.modified,
    'minimapGutter.deletedBackground': p.deleted,
  });

  sec('Scrollbars', {
    'scrollbarSlider.background': a(p.uiAccent, '40'),
    'scrollbarSlider.hoverBackground': a(p.uiAccent, '70'),
    'scrollbarSlider.activeBackground': a(p.uiAccent, 'A0'),
  });

  sec('Widgets del editor: find, suggest, hover, quick fix, rename (borde + glow del acento)', {
    'editorWidget.background': p.bg3,
    'editorWidget.foreground': p.uiAccent,
    'editorWidget.border': p.border,
    'editorWidget.resizeBorder': p.focus,
    'editorSuggestWidget.background': p.bg3,
    'editorSuggestWidget.border': p.border,
    'editorSuggestWidget.foreground': p.text,
    'editorSuggestWidget.selectedBackground': a(p.uiAccent, '33'),
    'editorSuggestWidget.selectedForeground': p.uiTextBright,
    'editorSuggestWidget.selectedIconForeground': p.uiAccent,
    'editorSuggestWidget.highlightForeground': p.uiAccent,
    'editorSuggestWidget.focusHighlightForeground': p.uiAccentAlt,
    'editorSuggestWidgetStatus.foreground': p.uiText,
    'editorHoverWidget.background': p.bg3,
    'editorHoverWidget.foreground': p.uiAccent,
    'editorHoverWidget.border': p.focus,
    'editorHoverWidget.highlightForeground': p.uiAccentAlt,
    'editorHoverWidget.statusBarBackground': p.bg4,
    'editorActionList.background': p.bg3,
    'editorActionList.foreground': p.uiAccent,
    'editorActionList.focusBackground': a(p.uiAccent, '40'),
    'editorActionList.focusForeground': p.uiTextBright,
    'listFilterWidget.background': p.bg3,
    'listFilterWidget.outline': p.focus,
    'listFilterWidget.noMatchesOutline': p.error,
    'listFilterWidget.shadow': a(p.uiAccent, '26'),
    'simpleFindWidget.sashBorder': p.border,
  });

  sec('Peek view (definiciones / referencias): en el acento, sin el azul default', {
    'peekView.border': p.uiAccent,
    'peekViewTitle.background': p.bg4,
    'peekViewTitleLabel.foreground': p.uiAccent,
    'peekViewTitleDescription.foreground': p.uiText,
    'peekViewEditor.background': p.bgPeek,
    'peekViewEditorGutter.background': p.bgPeek,
    'peekViewEditorStickyScroll.background': p.bgPeek,
    'peekViewEditorStickyScrollGutter.background': p.bgPeek,
    'peekViewEditor.matchHighlightBackground': a(p.findMatch, '40'),
    'peekViewEditor.matchHighlightBorder': a(p.findMatch, '99'),
    'peekViewResult.background': p.bg3,
    'peekViewResult.fileForeground': p.uiAccent,
    'peekViewResult.lineForeground': p.textNeutral,
    'peekViewResult.selectionBackground': a(p.uiAccent, '40'),
    'peekViewResult.selectionForeground': p.uiTextBright,
    'peekViewResult.matchHighlightBackground': a(p.findMatch, '40'),
  });

  sec('Diff editor: diffAdded = agregado, deleted = borrado', {
    'diffEditor.insertedLineBackground': a(p.diffAdded, '14'),
    'diffEditor.insertedTextBackground': a(p.diffAdded, '38'),
    'diffEditor.removedLineBackground': a(p.deleted, '1A'),
    'diffEditor.removedTextBackground': a(p.deleted, '48'),
    'diffEditorGutter.insertedLineBackground': a(p.diffAdded, '30'),
    'diffEditorGutter.removedLineBackground': a(p.deleted, '30'),
    'diffEditorOverview.insertedForeground': a(p.diffAdded, '99'),
    'diffEditorOverview.removedForeground': a(p.deleted, '99'),
    'diffEditor.border': p.border,
    'diffEditor.diagonalFill': a(p.border, '33'),
    'diffEditor.unchangedCodeBackground': a(p.bg3, '80'),
    'diffEditor.unchangedRegionBackground': p.bg1,
    'diffEditor.unchangedRegionForeground': p.uiText,
    'diffEditor.move.border': a(p.namespace, '80'),
    'diffEditor.moveActive.border': p.uiAccentCool,
    'multiDiffEditor.headerBackground': p.bg3,
    'multiDiffEditor.border': p.border,
  });

  sec('Merge conflicts: mergeCurrent / mergeIncoming / mergeBase', {
    'merge.currentHeaderBackground': a(p.mergeCurrent, '60'),
    'merge.currentContentBackground': a(p.mergeCurrent, '20'),
    'merge.incomingHeaderBackground': a(p.mergeIncoming, '60'),
    'merge.incomingContentBackground': a(p.mergeIncoming, '20'),
    'merge.commonHeaderBackground': a(p.mergeBase, '50'),
    'merge.commonContentBackground': a(p.mergeBase, '18'),
    'merge.border': p.border,
    'mergeEditor.change.background': a(p.diffAdded, '20'),
    'mergeEditor.change.word.background': a(p.diffAdded, '40'),
    'mergeEditor.changeBase.background': a(p.deleted, '20'),
    'mergeEditor.changeBase.word.background': a(p.deleted, '40'),
    'mergeEditor.conflict.input1.background': a(p.mergeCurrent, '20'),
    'mergeEditor.conflict.input2.background': a(p.mergeIncoming, '20'),
    'mergeEditor.conflict.unhandledFocused.border': p.warning,
    'mergeEditor.conflict.unhandledUnfocused.border': a(p.warning, '7A'),
    'mergeEditor.conflict.handledFocused.border': p.success,
    'mergeEditor.conflict.handledUnfocused.border': a(p.success, '50'),
    'mergeEditor.conflict.unhandled.minimapOverViewRuler': p.warning,
    'mergeEditor.conflict.handled.minimapOverViewRuler': p.success,
    'mergeEditor.conflictingLines.background': a(p.warning, '30'),
  });

  sec('Git: decoraciones del explorer y grafo SCM', {
    'gitDecoration.addedResourceForeground': p.inserted,
    'gitDecoration.modifiedResourceForeground': p.modified,
    'gitDecoration.deletedResourceForeground': p.deleted,
    'gitDecoration.renamedResourceForeground': p.uiAccentCool,
    'gitDecoration.untrackedResourceForeground': p.diffAdded,
    'gitDecoration.ignoredResourceForeground': p.ignored,
    'gitDecoration.conflictingResourceForeground': p.attention,
    'gitDecoration.submoduleResourceForeground': p.namespace,
    'gitDecoration.stageModifiedResourceForeground': p.modified,
    'gitDecoration.stageDeletedResourceForeground': p.deleted,
    'scmGraph.foreground1': p.uiAccent,
    'scmGraph.foreground2': p.modified,
    'scmGraph.foreground3': p.uiAccentCool,
    'scmGraph.foreground4': p.warning,
    'scmGraph.foreground5': p.namespace,
    'scmGraph.historyItemRefColor': p.uiAccent,
    'scmGraph.historyItemRemoteRefColor': p.uiAccentCool,
    'scmGraph.historyItemBaseRefColor': p.warning,
    'scmGraph.historyItemHoverDefaultLabelBackground': p.bg4,
    'scmGraph.historyItemHoverDefaultLabelForeground': p.uiAccent,
    'scmGraph.historyItemHoverAdditionsForeground': p.inserted,
    'scmGraph.historyItemHoverDeletionsForeground': p.deleted,
  });

  sec('Sidebar / explorer', {
    'sideBar.background': p.bg1,
    'sideBar.foreground': p.uiText,
    'sideBar.border': p.border,
    'sideBar.dropBackground': a(p.uiAccent, '30'),
    'sideBarTitle.foreground': p.uiTitle,
    'sideBarSectionHeader.background': p.bgSideHeader,
    'sideBarSectionHeader.foreground': p.uiAccentAlt,
    'sideBarSectionHeader.border': p.border,
    'sideBarStickyScroll.border': p.borderDim,
    'tree.indentGuidesStroke': p.guideStrong,
    'tree.inactiveIndentGuidesStroke': p.borderDim,
    'tree.tableColumnsBorder': p.borderDim,
  });

  sec('Listas y arboles', {
    'list.activeSelectionBackground': a(p.uiAccent, '50'),
    'list.activeSelectionForeground': p.uiTextBright,
    'list.inactiveSelectionBackground': a(p.uiAccent, '35'),
    'list.inactiveSelectionForeground': p.uiTextSoft,
    'list.hoverBackground': a(p.uiAccent, '1A'),
    'list.hoverForeground': p.uiText,
    'list.dropBackground': a(p.uiAccent, '50'),
    'list.highlightForeground': p.uiAccent,
    'list.focusHighlightForeground': p.uiAccentAlt,
    'list.filterMatchBackground': a(p.findMatch, '26'),
    'list.filterMatchBorder': a(p.findMatch, '80'),
    'list.deemphasizedForeground': p.textDim,
    'list.invalidItemForeground': p.errorSoft,
    'list.errorForeground': p.errorSoft,
    'list.warningForeground': p.warning,
  });

  sec('Activity bar', {
    'activityBar.background': p.bgActivityBar,
    'activityBar.foreground': p.uiAccent,
    'activityBar.inactiveForeground': p.textDim,
    'activityBar.border': p.borderDim,
    'activityBar.activeBorder': p.focus,
    'activityBar.activeBackground': a(p.uiAccent, '30'),
    'activityBarBadge.background': p.uiAccent,
    'activityBarBadge.foreground': p.onAccent,
    'activityBarTop.foreground': p.uiAccent,
    'activityBarTop.activeBorder': p.uiAccent,
    'activityBarTop.inactiveForeground': p.textDim,
    'activityBarTop.dropBorder': p.uiAccent,
    'activityErrorBadge.background': p.error,
    'activityErrorBadge.foreground': p.onSignal,
    'activityWarningBadge.background': p.warning,
    'activityWarningBadge.foreground': p.onSignal,
  });

  sec('Title bar y command center', {
    'titleBar.activeBackground': p.bgTitleBar,
    'titleBar.activeForeground': p.uiAccent,
    'titleBar.inactiveBackground': p.bgTitleBarInactive,
    'titleBar.inactiveForeground': p.textDim,
    'titleBar.border': p.border,
    'commandCenter.background': p.bgCommandCenter,
    'commandCenter.foreground': p.uiAccent,
    'commandCenter.border': a(p.uiAccent, '40'),
    'commandCenter.activeBackground': p.bgCommandCenterActive,
    'commandCenter.activeForeground': p.uiAccent,
    'commandCenter.activeBorder': p.border,
    'commandCenter.debuggingBackground': a(p.debug, '33'),
    'menubar.selectionBackground': a(p.uiAccent, '50'),
    'menubar.selectionForeground': p.uiTextBright,
    'menubar.selectionBorder': p.focus,
  });

  sec('Tabs y grupos de editores', {
    'editorGroup.border': p.border,
    'editorGroup.dropBackground': a(p.uiAccent, '30'),
    'editorGroup.dropIntoPromptBackground': p.bg3,
    'editorGroup.dropIntoPromptForeground': p.uiAccent,
    'editorGroup.dropIntoPromptBorder': p.focus,
    'editorGroupHeader.tabsBackground': a(p.uiAccent, '1C'),
    'editorGroupHeader.tabsBorder': p.border,
    'editorGroupHeader.border': p.borderDim,
    'tab.activeBackground': p.bgDeep,
    'tab.activeForeground': p.uiAccent,
    'tab.activeBorderTop': p.uiAccent,
    'tab.activeModifiedBorder': p.modified,
    'tab.inactiveBackground': a(BLACK, '00'),
    'tab.inactiveForeground': p.textDim,
    'tab.inactiveModifiedBorder': a(p.modified, '80'),
    'tab.hoverBackground': a(p.bgActive, '50'),
    'tab.hoverForeground': p.uiAccent,
    'tab.hoverBorder': p.focus,
    'tab.border': p.border,
    'tab.lastPinnedBorder': p.border,
    'tab.unfocusedActiveForeground': p.focus,
    'tab.unfocusedActiveBorderTop': a(p.uiAccent, '80'),
    'tab.unfocusedInactiveForeground': p.tabUnfocusedText,
    'tab.unfocusedHoverBackground': a(p.bgActive, '28'),
    'sideBySideEditor.horizontalBorder': p.border,
    'sideBySideEditor.verticalBorder': p.border,
    'breadcrumb.foreground': p.textDim,
    'breadcrumb.focusForeground': p.uiAccent,
    'breadcrumb.activeSelectionForeground': p.uiTextBright,
    'breadcrumbPicker.background': p.bg3,
  });

  sec('Status bar: estados como lineas de terminal (debug relleno, remoto = acento invertido)', {
    'statusBar.background': p.bgStatusBar,
    'statusBar.foreground': p.uiAccent,
    'statusBar.border': p.border,
    'statusBar.debuggingBackground': p.debug,
    'statusBar.debuggingForeground': p.onSignal,
    'statusBar.debuggingBorder': p.debug,
    'statusBar.noFolderBackground': p.bg3,
    'statusBar.noFolderForeground': p.uiAccentWarm,
    'statusBar.noFolderBorder': p.border,
    'statusBarItem.hoverBackground': a(p.uiAccent, '50'),
    'statusBarItem.activeBackground': a(p.uiAccent, '60'),
    'statusBarItem.compactHoverBackground': a(p.uiAccent, '40'),
    'statusBarItem.prominentBackground': a(p.uiAccent, '30'),
    'statusBarItem.prominentForeground': p.uiAccent,
    'statusBarItem.prominentHoverBackground': a(p.uiAccent, '50'),
    'statusBarItem.remoteBackground': p.uiAccent,
    'statusBarItem.remoteForeground': p.onAccent,
    'statusBarItem.remoteHoverBackground': p.focus,
    'statusBarItem.remoteHoverForeground': p.onAccent,
    'statusBarItem.errorBackground': p.error,
    'statusBarItem.errorForeground': p.onSignal,
    'statusBarItem.errorHoverBackground': p.errorSoft,
    'statusBarItem.errorHoverForeground': p.onSignal,
    'statusBarItem.warningBackground': p.warning,
    'statusBarItem.warningForeground': p.onSignal,
    'statusBarItem.warningHoverBackground': p.warningHover,
    'statusBarItem.warningHoverForeground': p.onSignal,
    'statusBarItem.offlineBackground': p.attention,
    'statusBarItem.offlineForeground': p.onSignal,
    'statusBarItem.offlineHoverBackground': p.attentionHover,
    'statusBarItem.offlineHoverForeground': p.onSignal,
  });

  sec('Panel', {
    'panel.background': p.bg2,
    'panel.border': p.border,
    'panelTitle.activeBorder': p.focus,
    'panelTitle.activeForeground': p.uiAccent,
    'panelTitle.inactiveForeground': p.textDim,
    'panelInput.border': p.focus,
    'panelSection.border': p.border,
    'panelSection.dropBackground': a(p.uiAccent, '50'),
    'panelSectionHeader.background': p.bg4,
    'panelSectionHeader.foreground': p.uiAccent,
    'panelSectionHeader.border': p.border,
    'panelStickyScroll.border': p.borderDim,
    'outputView.background': p.bg2,
  });

  sec('Terminal integrada', {
    'terminal.background': p.bgDeep,
    'terminal.foreground': p.terminalText,
    'terminal.border': p.border,
    'terminal.selectionBackground': a(p.uiAccent, '38'),
    'terminal.inactiveSelectionBackground': a(p.uiAccent, '20'),
    'terminal.findMatchBackground': a(p.findMatch, '4D'),
    'terminal.findMatchBorder': p.findMatch,
    'terminal.findMatchHighlightBackground': a(p.findMatch, '26'),
    'terminal.findMatchHighlightBorder': a(p.findMatch, '80'),
    'terminal.hoverHighlightBackground': a(p.uiAccent, '18'),
    'terminal.dropBackground': a(p.uiAccent, '30'),
    'terminal.initialHintForeground': p.textGhost,
    'terminal.tab.activeBorder': p.focus,
    'terminalCursor.foreground': p.cursor,
    'terminalCursor.background': p.onAccent,
    'terminalStickyScroll.background': p.bg2,
    'terminalStickyScroll.border': p.borderDim,
    'terminalStickyScrollHover.background': p.bgHover,
    'terminalCommandDecoration.defaultBackground': p.guideStrong,
    'terminalCommandDecoration.successBackground': p.success,
    'terminalCommandDecoration.errorBackground': p.error,
    'terminalOverviewRuler.border': p.borderDim,
    'terminalOverviewRuler.cursorForeground': a(p.cursor, 'CC'),
    'terminalOverviewRuler.findMatchForeground': a(p.findMatch, 'B0'),
  });

  sec('Terminal: paleta ANSI 16', {
    'terminal.ansiBlack': p.ansiBlack,
    'terminal.ansiRed': p.ansiRed,
    'terminal.ansiGreen': p.ansiGreen,
    'terminal.ansiYellow': p.ansiYellow,
    'terminal.ansiBlue': p.ansiBlue,
    'terminal.ansiMagenta': p.ansiMagenta,
    'terminal.ansiCyan': p.ansiCyan,
    'terminal.ansiWhite': p.ansiWhite,
    'terminal.ansiBrightBlack': p.ansiBrightBlack,
    'terminal.ansiBrightRed': p.ansiBrightRed,
    'terminal.ansiBrightGreen': p.ansiBrightGreen,
    'terminal.ansiBrightYellow': p.ansiBrightYellow,
    'terminal.ansiBrightBlue': p.ansiBrightBlue,
    'terminal.ansiBrightMagenta': p.ansiBrightMagenta,
    'terminal.ansiBrightCyan': p.ansiBrightCyan,
    'terminal.ansiBrightWhite': p.ansiBrightWhite,
  });

  sec('Terminal: iconos de sugerencias (mismos roles que symbolIcon)', {
    'terminalSymbolIcon.aliasForeground': p.namespace,
    'terminalSymbolIcon.argumentForeground': p.parameter,
    'terminalSymbolIcon.flagForeground': p.constant,
    'terminalSymbolIcon.optionForeground': p.constant,
    'terminalSymbolIcon.optionValueForeground': p.string,
    'terminalSymbolIcon.methodForeground': p.func,
    'terminalSymbolIcon.fileForeground': p.string,
    'terminalSymbolIcon.folderForeground': p.uiAccent,
    'terminalSymbolIcon.branchForeground': p.uiAccent,
    'terminalSymbolIcon.remoteForeground': p.uiAccentCool,
  });

  sec('Quick input / command palette', {
    'quickInput.background': p.bg3,
    'quickInput.foreground': p.uiAccent,
    'quickInputTitle.background': p.bg3,
    'quickInputList.focusBackground': a(p.uiAccent, '40'),
    'quickInputList.focusForeground': p.uiTextBright,
    'quickInputList.focusIconForeground': p.uiAccent,
    'quickInputList.focusHighlightForeground': p.uiAccentAlt,
    'pickerGroup.foreground': p.uiAccentWarm,
    'pickerGroup.border': p.border,
    'keybindingLabel.background': p.bg4,
    'keybindingLabel.foreground': p.uiAccent,
    'keybindingLabel.border': p.border,
    'keybindingLabel.bottomBorder': p.focus,
  });

  sec('Inputs, dropdowns, checkboxes, radios', {
    'input.background': p.bg3,
    'input.foreground': p.uiAccent,
    'input.border': p.focus,
    'input.placeholderForeground': p.textDim,
    'inputOption.activeBackground': a(p.uiAccent, '50'),
    'inputOption.activeBorder': p.focus,
    'inputOption.activeForeground': p.uiAccent,
    'inputOption.hoverBackground': a(p.uiAccent, '30'),
    'inputValidation.errorBackground': p.errorBg,
    'inputValidation.errorBorder': p.error,
    'inputValidation.errorForeground': p.errorSoft,
    'inputValidation.warningBackground': p.warningBg,
    'inputValidation.warningBorder': p.warning,
    'inputValidation.warningForeground': p.warning,
    'inputValidation.infoBackground': p.infoBg,
    'inputValidation.infoBorder': p.info,
    'inputValidation.infoForeground': p.info,
    'dropdown.background': p.bg3,
    'dropdown.listBackground': p.bg3,
    'dropdown.border': p.focus,
    'dropdown.foreground': p.uiAccent,
    'checkbox.background': p.bg3,
    'checkbox.foreground': p.uiAccent,
    'checkbox.border': p.focus,
    'checkbox.selectBackground': p.bg3,
    'checkbox.selectBorder': p.uiAccent,
    'checkbox.disabled.background': p.bg4,
    'checkbox.disabled.foreground': p.textDisabled,
    'radio.activeBackground': a(p.uiAccent, '50'),
    'radio.activeBorder': p.focus,
    'radio.activeForeground': p.uiTextBright,
    'radio.inactiveBorder': a(p.border, '80'),
    'radio.inactiveForeground': p.uiText,
    'radio.inactiveHoverBackground': a(p.uiAccent, '30'),
  });

  sec('Botones', {
    'button.background': p.uiAccent,
    'button.foreground': p.onAccent,
    'button.hoverBackground': p.focus,
    'button.border': p.focus,
    'button.secondaryBackground': a(p.uiAccent, '30'),
    'button.secondaryForeground': p.uiAccent,
    'button.secondaryHoverBackground': a(p.uiAccent, '45'),
    'button.separator': a(p.onAccent, '66'),
  });

  sec('Menus y notificaciones', {
    'menu.background': p.bg3,
    'menu.foreground': p.uiAccent,
    'menu.selectionBackground': a(p.uiAccent, '50'),
    'menu.selectionForeground': p.uiTextBright,
    'menu.selectionBorder': p.focus,
    'menu.separatorBackground': p.border,
    'menu.border': p.border,
    'notificationCenter.border': p.focus,
    'notificationCenterHeader.background': p.bg4,
    'notificationCenterHeader.foreground': p.uiAccent,
    'notificationToast.border': p.focus,
    'notifications.background': p.bg3,
    'notifications.foreground': p.uiAccent,
    'notifications.border': p.focus,
    'notificationLink.foreground': p.link,
    'notificationsErrorIcon.foreground': p.error,
    'notificationsWarningIcon.foreground': p.warning,
    'notificationsInfoIcon.foreground': p.info,
    'banner.background': p.bg4,
    'banner.foreground': p.uiAccent,
    'banner.iconForeground': p.uiAccentWarm,
  });

  sec('Iconos de simbolos (suggest, outline, breadcrumbs) por rol', {
    'symbolIcon.classForeground': p.type,
    'symbolIcon.interfaceForeground': p.type,
    'symbolIcon.structForeground': p.type,
    'symbolIcon.enumeratorForeground': p.type,
    'symbolIcon.typeParameterForeground': p.namespace,
    'symbolIcon.namespaceForeground': p.namespace,
    'symbolIcon.moduleForeground': p.namespace,
    'symbolIcon.packageForeground': p.namespace,
    'symbolIcon.functionForeground': p.func,
    'symbolIcon.methodForeground': p.func,
    'symbolIcon.constructorForeground': p.func,
    'symbolIcon.variableForeground': p.variable,
    'symbolIcon.fieldForeground': p.property,
    'symbolIcon.propertyForeground': p.property,
    'symbolIcon.keyForeground': p.property,
    'symbolIcon.constantForeground': p.constant,
    'symbolIcon.enumeratorMemberForeground': p.constant,
    'symbolIcon.numberForeground': p.number,
    'symbolIcon.booleanForeground': p.number,
    'symbolIcon.nullForeground': p.number,
    'symbolIcon.keywordForeground': p.keyword,
    'symbolIcon.operatorForeground': p.operator,
    'symbolIcon.stringForeground': p.string,
    'symbolIcon.textForeground': p.string,
    'symbolIcon.eventForeground': p.special,
    'symbolIcon.snippetForeground': p.func,
    'symbolIcon.arrayForeground': p.type,
    'symbolIcon.objectForeground': p.type,
    'symbolIcon.colorForeground': p.constant,
    'symbolIcon.fileForeground': p.uiAccent,
    'symbolIcon.folderForeground': p.uiAccent,
    'symbolIcon.referenceForeground': p.namespace,
    'symbolIcon.unitForeground': p.number,
  });

  sec('Debug', {
    'debugToolBar.background': p.bg3,
    'debugToolBar.border': p.debug,
    'editor.stackFrameHighlightBackground': a(p.debug, '2E'),
    'editor.focusedStackFrameHighlightBackground': a(p.uiAccent, '26'),
    'debugIcon.breakpointForeground': p.error,
    'debugIcon.breakpointDisabledForeground': p.inactiveIcon,
    'debugIcon.breakpointUnverifiedForeground': p.inactiveIcon,
    'debugIcon.breakpointCurrentStackframeForeground': p.debug,
    'debugIcon.breakpointStackframeForeground': p.inserted,
    'debugIcon.startForeground': p.success,
    'debugIcon.continueForeground': p.uiAccentCool,
    'debugIcon.pauseForeground': p.debug,
    'debugIcon.stepOverForeground': p.uiAccentCool,
    'debugIcon.stepIntoForeground': p.uiAccentCool,
    'debugIcon.stepOutForeground': p.uiAccentCool,
    'debugIcon.stepBackForeground': p.uiAccentCool,
    'debugIcon.restartForeground': p.success,
    'debugIcon.stopForeground': p.error,
    'debugIcon.disconnectForeground': p.error,
    'debugTokenExpression.name': p.property,
    'debugTokenExpression.value': p.variable,
    'debugTokenExpression.string': p.string,
    'debugTokenExpression.boolean': p.number,
    'debugTokenExpression.number': p.number,
    'debugTokenExpression.type': p.type,
    'debugTokenExpression.error': p.error,
    'debugView.valueChangedHighlight': p.modified,
    'debugView.stateLabelBackground': p.bg4,
    'debugView.stateLabelForeground': p.uiAccent,
    'debugView.exceptionLabelBackground': p.error,
    'debugView.exceptionLabelForeground': p.onSignal,
    'debugExceptionWidget.background': p.exceptionBg,
    'debugExceptionWidget.border': p.error,
    'debugConsole.infoForeground': p.info,
    'debugConsole.warningForeground': p.warning,
    'debugConsole.errorForeground': p.error,
    'debugConsole.sourceForeground': p.textDim,
    'debugConsoleInputIcon.foreground': p.uiAccent,
  });

  sec('Testing y cobertura', {
    'testing.iconPassed': p.success,
    'testing.iconFailed': p.error,
    'testing.iconErrored': p.error,
    'testing.iconQueued': p.uiAccentWarm,
    'testing.iconUnset': p.inactiveIcon,
    'testing.iconSkipped': p.inactiveIcon,
    'testing.runAction': p.success,
    'testing.peekBorder': p.error,
    'testing.peekHeaderBackground': a(p.error, '1A'),
    'testing.messagePeekBorder': p.info,
    'testing.messagePeekHeaderBackground': a(p.info, '1A'),
    'testing.message.error.badgeBackground': p.error,
    'testing.message.error.badgeBorder': p.error,
    'testing.message.error.badgeForeground': p.onSignal,
    'testing.message.info.decorationForeground': a(p.info, '99'),
    'testing.coverCountBadgeBackground': p.bg4,
    'testing.coverCountBadgeForeground': p.uiAccent,
    'testing.uncoveredBranchBackground': a(p.error, '40'),
  });

  sec('Chat / inline chat / agentes', {
    'chat.requestBorder': p.borderDim,
    'chat.requestCodeBorder': p.border,
    'chat.checkpointSeparator': p.borderDim,
    'chat.avatarBackground': p.bg4,
    'chat.avatarForeground': p.uiAccent,
    'chat.slashCommandBackground': a(p.uiAccentCool, '20'),
    'chat.slashCommandForeground': p.uiAccentCool,
    'chat.editedFileForeground': p.modified,
    'chat.linesAddedForeground': p.inserted,
    'chat.linesRemovedForeground': p.errorSoft,
    'chat.thinkingShimmer': p.variable,
    'chat.mcpCompatibilityWarningForeground': p.warning,
    'chat.sessionStateIndicator.needsInputBorder': p.warning,
    'chat.sessionStateIndicator.unvisitedBorder': p.inserted,
    'chat.fusionBadgeGradientStart': p.uiAccent,
    'chat.fusionBadgeGradientEnd': p.uiAccentCool,
    'chat.workingProgressStableIconForeground': p.uiAccent,
    'chat.workingProgressInsidersIconForeground': p.uiAccentCool,
    'inlineChat.background': p.bg3,
    'inlineChat.border': p.border,
    'inlineChat.foreground': p.uiAccent,
    'inlineChatDiff.inserted': a(p.diffAdded, '1A'),
    'inlineChatDiff.removed': a(p.deleted, '1A'),
    'interactive.activeCodeBorder': p.focus,
    'agentsNewSessionButton.hoverBackground': a(p.uiAccent, '30'),
    'agentsWindowGraphic.orange': p.warning,
  });

  sec('Charts, markdown alerts, confetti', {
    'charts.foreground': p.uiAccent,
    'charts.lines': a(p.uiAccent, '80'),
    'charts.red': p.error,
    'charts.blue': p.info,
    'charts.yellow': p.modified,
    'charts.orange': p.warning,
    'charts.green': p.inserted,
    'charts.purple': p.namespace,
    'chart.line': p.uiAccentCool,
    'chart.axis': a(p.textDim, '66'),
    'chart.guide': p.borderDim,
    'markdownAlert.note.foreground': p.info,
    'markdownAlert.tip.foreground': p.inserted,
    'markdownAlert.important.foreground': p.attention,
    'markdownAlert.warning.foreground': p.warning,
    'markdownAlert.caution.foreground': p.error,
    'confetti.color1': p.uiAccent,
    'confetti.color2': p.modified,
    'confetti.color3': p.uiAccentCool,
    'confetti.color4': p.warning,
    'confetti.color5': p.inserted,
    'confetti.color6': p.namespace,
  });

  sec('Notebooks', {
    'notebook.cellStatusBarItemHoverBackground': a(p.uiAccent, '26'),
    'notebook.cellToolbarSeparator': a(p.border, '59'),
    'notebook.outputContainerBorderColor': p.borderDim,
    'notebook.symbolHighlightBackground': a(p.uiAccent, '10'),
    'notebookStatusErrorIcon.foreground': p.error,
    'notebookStatusSuccessIcon.foreground': p.success,
  });

  sec('Comentarios de revision', {
    'commentsView.resolvedIcon': p.textDim,
    'commentsView.unresolvedIcon': p.focus,
    'editorCommentsWidget.replyInputBackground': p.bg3,
    'editorCommentsWidget.resolvedBorder': p.textDim,
  });

  sec('Settings, extensiones, welcome', {
    'settings.headerForeground': p.uiAccent,
    'settings.modifiedItemIndicator': p.modified,
    'settings.checkboxBackground': p.bg3,
    'settings.checkboxForeground': p.uiAccent,
    'settings.checkboxBorder': p.focus,
    'settings.dropdownBackground': p.bg3,
    'settings.dropdownForeground': p.uiAccent,
    'settings.dropdownBorder': p.focus,
    'settings.dropdownListBorder': p.border,
    'extensionButton.prominentBackground': p.uiAccent,
    'extensionButton.prominentForeground': p.onAccent,
    'extensionButton.prominentHoverBackground': p.focus,
    'extensionIcon.starForeground': p.uiAccentWarm,
    'extensionIcon.verifiedForeground': p.uiAccentCool,
    'extensionIcon.sponsorForeground': p.attention,
    'extensionIcon.preReleaseForeground': p.namespace,
    'extensionIcon.privateForeground': p.uiText,
    'mcpIcon.starForeground': p.uiAccentWarm,
    'welcomePage.tileBackground': p.bg3,
    'welcomePage.tileHoverBackground': p.bg4,
    'welcomePage.tileBorder': a(p.uiAccent, '26'),
    'welcomePage.progress.foreground': p.uiAccent,
    'walkthrough.stepTitle.foreground': p.uiAccent,
    'walkThrough.embeddedEditorBackground': p.bg3,
  });

  // ───────────────────────── tokenColors ─────────────────────────
  // fontStyle por defecto "" (explicito) para cortar herencia de bold/italic de scopes padre.
  // Cada regla guarda su `role` (no se emite) para que el validador sepa que rol pinta.
  const tokens = [];
  let group = null;
  const G = (title) => { group = title; };
  const R = (name, scope, role, fontStyle = '') => {
    const settings = {};
    if (role) {
      if (!(role in p)) throw new Error(`template: rol desconocido "${role}" en "${name}"`);
      settings.foreground = p[role];
    }
    if (fontStyle !== null) settings.fontStyle = fontStyle;
    tokens.push({ group, name, scope: Array.isArray(scope) ? scope : [scope], settings, role });
    group = null;
  };

  G('Base: comentarios, strings, literales');
  R('Comments', ['comment', 'punctuation.definition.comment', 'string.comment'], 'comment', fs.comment);
  R('Doc comment tags', ['storage.type.class.jsdoc', 'keyword.other.phpdoc', 'storage.type.class.doxygen', 'keyword.other.documentation', 'comment.block.documentation keyword', 'comment.block.documentation storage.type'], 'comment', join('bold', fs.comment));
  R('Doc comment types', ['entity.name.type.instance.jsdoc', 'comment.block.documentation entity.name.type', 'comment.block.documentation support.type'], 'namespace', fs.comment);
  R('Doc comment params', ['variable.other.jsdoc', 'comment.block.documentation variable'], 'parameter', fs.comment);
  R('Strings', ['string', 'string.quoted', 'string.template', 'string.interpolated', 'string.unquoted', 'punctuation.definition.string'], 'string');
  R('Template / interpolation delimiters', ['punctuation.definition.template-expression', 'punctuation.section.embedded', 'punctuation.definition.interpolation', 'punctuation.definition.variable.makefile'], 'escape');
  R('Escapes and format placeholders', ['constant.character.escape', 'constant.character.format.placeholder', 'constant.other.placeholder', 'constant.character.string.escape'], 'escape');
  R('Regular expressions', ['string.regexp', 'string.regexp punctuation.definition.string', 'punctuation.definition.string.regexp', 'punctuation.definition.string.begin.regexp', 'punctuation.definition.string.end.regexp'], 'regexp');
  R('Regex internals', ['constant.other.character-class.regexp', 'constant.character.character-class.regexp', 'constant.other.character-class.set.regexp', 'constant.character.set.regexp'], 'constant');
  R('Regex operators', ['keyword.operator.quantifier.regexp', 'keyword.control.anchor.regexp', 'keyword.operator.or.regexp', 'keyword.operator.negation.regexp', 'punctuation.definition.group.regexp', 'punctuation.definition.character-class.regexp', 'support.other.parenthesis.regexp'], 'keyword');
  R('Numbers, booleans, null, language constants', ['constant.numeric', 'constant.language', 'constant.other', 'keyword.other.unit', 'support.constant', 'constant.sha.git-rebase'], 'number');
  R('Character literals', ['constant.character', 'string.quoted.single.c', 'string.quoted.single.cpp'], 'number');
  R('HTML / XML entities', ['constant.character.entity', 'punctuation.definition.entity'], 'escape');

  G('Keywords, storage, operadores, puntuacion');
  R('Keywords and control flow', ['keyword', 'keyword.control', 'storage.type', 'storage.modifier', 'keyword.operator.new', 'keyword.operator.expression', 'keyword.operator.cast', 'keyword.operator.sizeof', 'keyword.operator.alignof', 'keyword.operator.typeid', 'keyword.operator.logical.python', 'keyword.operator.wordlike', 'keyword.other.using', 'keyword.other.operator'], 'keyword', fs.keyword);
  R('Imports and exports', ['keyword.control.import', 'keyword.control.from', 'keyword.control.export', 'keyword.control.require', 'keyword.control.directive.import', 'keyword.other.import', 'keyword.other.package', 'keyword.control.default'], 'keyword', fs.keyword);
  R('Arrows and spread', ['storage.type.function.arrow', 'keyword.operator.arrow', 'keyword.operator.spread', 'keyword.operator.rest', 'keyword.operator.optional', 'keyword.operator.definiteassignment'], 'keyword');
  R('Operators', ['keyword.operator', 'punctuation.separator', 'punctuation.accessor', 'punctuation.definition', 'keyword.operator.borrow'], 'operator');
  R('Punctuation and brackets', ['punctuation', 'meta.brace', 'punctuation.definition.block', 'punctuation.definition.parameters', 'punctuation.definition.arguments', 'punctuation.definition.array', 'punctuation.definition.dictionary', 'punctuation.terminator'], 'punctuation');
  R('Invalid / illegal', ['invalid', 'invalid.illegal'], 'error', 'underline');
  R('Deprecated', ['invalid.deprecated'], 'warning', 'strikethrough');

  G('Funciones, tipos, namespaces');
  R('Functions and methods', ['entity.name.function', 'support.function', 'meta.function-call.generic.python', 'entity.name.function.member', 'support.function.builtin', 'entity.name.command', 'support.constant.handlebars'], 'func');
  R('Function declarations', ['meta.definition.function entity.name.function', 'meta.definition.method entity.name.function', 'meta.function.python entity.name.function', 'entity.name.function.definition', 'meta.function.definition.rust entity.name.function'], 'func', fs.declaration);
  R('Magic / dunder methods', ['support.function.magic', 'support.variable.magic'], 'func', 'italic');
  R('Decorators, annotations and attributes', ['entity.name.function.decorator', 'punctuation.definition.decorator', 'storage.type.annotation', 'punctuation.definition.annotation', 'meta.attribute.rust', 'meta.attribute.swift', 'support.attribute'], 'func', fs.decorator);
  R('Macros and preprocessor', ['entity.name.function.macro', 'support.function.macro', 'support.function.builtin-macro', 'entity.name.function.preprocessor', 'meta.preprocessor.macro entity.name.function', 'meta.preprocessor.macro entity.name'], 'special', fs.keyword);
  R('Preprocessor directives', ['keyword.control.directive', 'punctuation.definition.directive', 'meta.preprocessor keyword'], 'keyword', fs.keyword);
  R('Types and classes', ['entity.name.type', 'support.type', 'support.class', 'entity.other.inherited-class', 'storage.type.built-in', 'storage.type.primitive', 'storage.type.java', 'storage.type.php', 'source.cs keyword.type', 'support.type.primitive', 'support.type.builtin', 'entity.name.type.primitive'], 'type');
  R('Type declarations', ['entity.name.type.class', 'entity.name.type.struct', 'entity.name.type.enum', 'entity.name.type.interface', 'entity.name.type.trait', 'entity.name.type.alias', 'entity.name.type.record', 'entity.name.class'], 'type', fs.declaration);
  R('Traits and interfaces (refs)', ['entity.name.type.trait.rust', 'entity.name.type.interface.php'], 'type', 'italic');
  R('Type parameters, generics, lifetimes', ['entity.name.type.parameter', 'storage.type.generic.java', 'entity.name.type.lifetime', 'punctuation.definition.lifetime'], 'namespace', 'italic');
  R('Namespaces, modules, packages', ['entity.name.namespace', 'entity.name.type.namespace', 'entity.name.type.module', 'entity.name.module', 'entity.name.type.package', 'entity.name.scope-resolution', 'support.other.namespace', 'storage.modifier.package.java', 'storage.modifier.import.java', 'entity.name.import.go'], 'namespace');
  R('Labels', ['entity.name.label'], 'constant', 'italic');

  G('Variables, propiedades, this/self');
  R('Variables', ['variable', 'variable.other', 'variable.other.readwrite', 'support.variable', 'punctuation.definition.variable', 'variable.other.definition.java'], 'variable');
  R('Parameters', ['variable.parameter', 'meta.parameter variable', 'variable.parameter.function'], 'parameter', fs.parameter);
  R('Constants (UPPER_CASE / readonly)', ['variable.other.constant', 'variable.other.enummember'], 'constant');
  R('Properties and object keys', ['variable.other.property', 'variable.other.object.property', 'variable.object.property', 'meta.object-literal.key', 'support.variable.property', 'variable.other.member', 'entity.name.variable.field', 'variable.other.readwrite.member', 'variable.other.readwrite.instance', 'support.type.property-name'], 'property');
  R('this / self / super', ['variable.language', 'variable.language.this', 'variable.language.super', 'variable.language.self', 'variable.language.special.self', 'variable.language.special.cls', 'variable.parameter.function.language.special.self', 'variable.parameter.function.language.special.cls'], 'selfVar', fs.selfVar);

  G('Markup: HTML, JSX, XML');
  R('Tags', ['entity.name.tag', 'meta.tag.sgml.doctype', 'punctuation.definition.tag.html meta.tag.sgml'], 'tag', fs.tag);
  R('Components (JSX / Vue / Svelte)', ['support.class.component', 'entity.name.tag.custom'], 'type', fs.tag);
  R('Tag namespaces', ['entity.name.tag.namespace', 'entity.other.attribute-name.namespace'], 'namespace');
  R('Attributes', ['entity.other.attribute-name'], 'attribute', fs.attribute);
  R('Tag brackets', ['punctuation.definition.tag', 'punctuation.definition.tag.begin', 'punctuation.definition.tag.end'], 'textDim');
  R('JSX text', ['meta.jsx.children'], 'text');

  G('Estilos: CSS / SCSS / Less');
  R('CSS tag selectors', ['entity.name.tag.css', 'entity.name.tag.less'], 'tag', fs.tag);
  R('CSS class and id selectors', ['entity.other.attribute-name.class', 'entity.other.attribute-name.id', 'entity.other.attribute-name.class.css', 'entity.other.attribute-name.id.css'], 'func');
  R('CSS pseudo selectors', ['entity.other.attribute-name.pseudo-class', 'entity.other.attribute-name.pseudo-element', 'entity.other.attribute-name.parent-selector-suffix'], 'namespace', 'italic');
  R('SCSS parent reference', ['entity.name.tag.reference.scss', 'entity.other.attribute-name.parent'], 'tag');
  R('CSS property names', ['support.type.property-name.css', 'support.type.property-name.less', 'support.type.vendored.property-name', 'support.type.property-name.media', 'meta.property-name'], 'property');
  R('CSS property values', ['support.constant.property-value', 'support.constant.font-name', 'support.constant.media', 'support.constant.vendored.property-value', 'meta.property-value'], 'constant');
  R('CSS colors and numbers', ['constant.other.color', 'constant.other.color.rgb-value', 'support.constant.color', 'constant.numeric.css'], 'number');
  R('CSS variables', ['variable.css', 'variable.scss', 'variable.argument.css', 'support.type.custom-property'], 'variable');
  R('CSS at-rules', ['keyword.control.at-rule', 'punctuation.definition.keyword.css', 'punctuation.definition.keyword.scss'], 'keyword', fs.keyword);
  R('CSS !important', ['keyword.other.important'], 'special', fs.keyword);

  G('Datos: JSON, YAML, INI, dotenv, TOML');
  R('JSON keys', ['support.type.property-name.json', 'support.type.property-name.json punctuation', 'punctuation.support.type.property-name'], 'property');
  R('YAML keys', ['entity.name.tag.yaml'], 'property');
  R('YAML anchors and aliases', ['punctuation.definition.anchor.yaml', 'punctuation.definition.alias.yaml', 'variable.other.anchor.yaml', 'variable.other.alias.yaml'], 'namespace', 'italic');
  R('YAML document markers', ['entity.other.document.begin.yaml', 'entity.other.document.end.yaml', 'punctuation.definition.block.sequence.item.yaml'], 'constant');
  R('INI sections', ['entity.name.section.group-title.ini', 'punctuation.definition.entity.ini'], 'markupHeading', fs.heading);
  R('INI / properties / dotenv keys', ['keyword.other.definition.ini', 'variable.key.dotenv', 'support.type.property-name.toml'], 'property');
  R('dotenv values and interpolation', ['property.value.dotenv'], 'string');
  R('dotenv interpolation', ['variable.interpolation.dotenv'], 'escape');

  G('Markdown (README hacker)');
  R('Markdown headings', ['markup.heading', 'markup.heading entity.name.section', 'entity.name.section.markdown', 'markup.heading.setext'], 'markupHeading', fs.heading);
  R('Markdown heading marks', ['punctuation.definition.heading.markdown'], 'textDim', fs.heading);
  R('Markdown bold', ['markup.bold', 'punctuation.definition.bold.markdown'], 'markupBold', 'bold');
  R('Markdown italic', ['markup.italic', 'punctuation.definition.italic.markdown'], 'markupItalic', 'italic');
  R('Markdown strikethrough', ['markup.strikethrough', 'punctuation.definition.strikethrough.markdown'], 'textGhost', 'strikethrough');
  R('Markdown inline code', ['markup.inline.raw', 'markup.inline.raw.string.markdown', 'punctuation.definition.raw.markdown', 'markup.raw.inline'], 'markupCode');
  R('Markdown fenced code', ['markup.fenced_code.block.markdown', 'markup.raw.block.markdown'], 'text');
  R('Markdown fence markers', ['markup.fenced_code.block.markdown punctuation.definition.markdown'], 'textDim');
  R('Markdown code language', ['fenced_code.block.language', 'fenced_code.block.language.markdown', 'fenced_code.block.language.attributes'], 'namespace', 'italic');
  R('Markdown quotes', ['markup.quote', 'markup.quote.markdown', 'punctuation.definition.quote.begin.markdown'], 'comment', fs.comment);
  R('Markdown list bullets', ['punctuation.definition.list.begin.markdown'], 'number', 'bold');
  R('Markdown link URL', ['markup.underline.link', 'markup.underline.link.markdown', 'markup.underline.link.image.markdown', 'meta.link.inet.markdown', 'meta.link.email.lt-gt.markdown'], 'link', 'underline');
  R('Markdown link text', ['string.other.link.title.markdown', 'string.other.link.description.markdown', 'string.other.link.description.title.markdown'], 'linkActive');
  R('Markdown link punctuation and refs', ['punctuation.definition.link.title.begin.markdown', 'punctuation.definition.link.title.end.markdown', 'punctuation.definition.link.description.begin.markdown', 'punctuation.definition.link.description.end.markdown', 'punctuation.definition.metadata.markdown', 'punctuation.definition.link.markdown', 'constant.other.reference.link.markdown'], 'textDim');
  R('Markdown separators and tables', ['meta.separator.markdown', 'punctuation.definition.table.markdown', 'punctuation.separator.table.markdown'], 'textDim');
  R('Markdown front matter', ['markup.raw.yaml.front-matter', 'punctuation.definition.begin.frontmatter', 'punctuation.definition.end.frontmatter'], 'textDim');
  R('Generic emphasis', ['emphasis'], null, 'italic');
  R('Generic strong', ['strong'], null, 'bold');

  G('Diff / parches');
  R('Diff inserted', ['markup.inserted', 'markup.inserted.diff', 'punctuation.definition.inserted.diff', 'markup.inserted.git-commit'], 'inserted');
  R('Diff deleted', ['markup.deleted', 'markup.deleted.diff', 'punctuation.definition.deleted.diff', 'markup.deleted.git-commit'], 'deleted');
  R('Diff changed', ['markup.changed', 'markup.changed.diff', 'punctuation.definition.changed.diff', 'markup.changed.git-commit'], 'changed');
  R('Diff ranges', ['meta.diff.range', 'meta.diff.range.unified', 'meta.diff.range.normal', 'meta.diff.range.context', 'punctuation.definition.range.diff', 'meta.toc-list.line-number.diff'], 'info', 'bold');
  R('Diff headers', ['meta.diff.header', 'meta.diff.header.from-file', 'meta.diff.header.to-file', 'meta.diff.header.git', 'meta.diff.header.command', 'meta.diff.index', 'meta.diff.index.git', 'punctuation.definition.from-file.diff', 'punctuation.definition.to-file.diff', 'meta.toc-list.file-name.diff'], 'uiAccent', 'bold');
  R('Diff separators', ['meta.separator.diff', 'punctuation.definition.separator.diff', 'meta.diff.only-in'], 'textDim');
  R('Git rebase commands', ['support.function.git-rebase'], 'keyword', fs.keyword);

  G('Logs (server.log, Output)');
  R('Log error', ['log.error', 'log.exception'], 'error', 'bold');
  R('Log exception type', ['log.exceptiontype'], 'error');
  R('Log warning', ['log.warning'], 'warning', 'bold');
  R('Log info', ['log.info'], 'info');
  R('Log debug', ['log.debug'], 'textDim');
  R('Log verbose / trace', ['log.verbose'], 'textGhost');
  R('Log date and time', ['log.date'], 'namespace');
  R('Log constants and numbers', ['log.constant'], 'number');
  R('Log strings', ['log.string'], 'string');

  G('Lenguajes: detalles por gramatica');
  R('Shell builtins and commands', ['support.function.builtin.shell', 'entity.name.command.shell'], 'func');
  R('Shell variables', ['variable.other.normal.shell', 'variable.other.bracket.shell', 'punctuation.definition.variable.shell', 'variable.other.readwrite.powershell'], 'escape');
  R('Shell interpolation', ['punctuation.definition.evaluation.backticks.shell'], 'escape');
  R('SQL types', ['storage.type.sql'], 'type');
  R('SQL functions', ['support.function.aggregate.sql', 'support.function.string.sql'], 'func');
  R('PHP variables', ['variable.other.php', 'punctuation.definition.variable.php'], 'variable');
  R('Rust mutability', ['storage.modifier.mut.rust'], 'keyword', join(fs.keyword, 'italic'));
  R('Go builtin types', ['source.go storage.type', 'source.go entity.name.type'], 'type');
  R('Java / Kotlin / Groovy packages', ['storage.modifier.import', 'storage.modifier.package'], 'namespace');
  R('Makefile targets', ['entity.name.function.target.makefile'], 'func', fs.declaration);
  R('Dockerfile instructions', ['keyword.other.special-method.dockerfile'], 'keyword', fs.keyword);
  R('LaTeX / Typst commands', ['support.function.be.latex', 'support.function.general.tex', 'keyword.control.preamble.latex', 'support.function.section.latex'], 'func');
  R('Embedded language reset', ['meta.embedded.line'], 'text');

  // ───────────────────────── semanticTokenColors ─────────────────────────
  const semantic = [];
  const SG = (title, obj) => semantic.push({ title, obj });
  const declFlags = flags(fs.declaration);
  const decl = Object.keys(declFlags).length ? declFlags : { bold: false };

  SG('Tipos base', {
    'namespace': p.namespace,
    'type': p.type,
    'class': p.type,
    'struct': p.type,
    'enum': p.type,
    'interface': sem(p.type, 'italic'),
    'typeParameter': sem(p.namespace, 'italic'),
    'function': p.func,
    'method': p.func,
    'macro': sem(p.special, fs.keyword),
    'decorator': sem(p.func, fs.decorator),
    'variable': p.variable,
    'parameter': sem(p.parameter, fs.parameter),
    'property': p.property,
    'enumMember': p.constant,
    'event': p.special,
    'label': sem(p.constant, 'italic'),
    'keyword': p.keyword,
    'modifier': p.keyword,
    'comment': sem(p.comment, fs.comment),
    'string': p.string,
    'number': p.number,
    'regexp': p.regexp,
    'operator': p.operator,
  });

  SG('Modificadores: declaraciones (fontStyle.declaration, solo simbolos grandes)', {
    'function.declaration': { ...decl },
    'method.declaration': { ...decl },
    'class.declaration': { ...decl },
    'struct.declaration': { ...decl },
    'interface.declaration': { ...decl },
    'enum.declaration': { ...decl },
    'type.declaration': { ...decl },
    'namespace.declaration': { ...decl },
  });

  SG('Modificadores: readonly / constantes (constant)', {
    'variable.readonly': p.variable,
    'property.readonly': p.property,
    'variable.readonly.defaultLibrary': p.constant,
    'property.readonly.defaultLibrary': sem(p.constant, 'italic'),
  });

  SG('Modificadores: libreria estandar (italic)', {
    'variable.defaultLibrary': sem(p.namespace, 'italic'),
    'function.defaultLibrary': sem(p.func, 'italic'),
    'method.defaultLibrary': sem(p.func, 'italic'),
    'class.defaultLibrary': sem(p.type, 'italic'),
    'type.defaultLibrary': sem(p.type, 'italic'),
    'interface.defaultLibrary': sem(p.type, 'italic'),
    'namespace.defaultLibrary': sem(p.namespace, 'italic'),
    'property.defaultLibrary': sem(p.property, 'italic'),
  });

  SG('Modificadores: estado', {
    '*.deprecated': { strikethrough: true },
    '*.async': { italic: true },
    '*.static': { italic: true },
    '*.abstract': { italic: true },
  });

  SG('Python (Pylance)', {
    'selfParameter': sem(p.selfVar, fs.selfVar),
    'clsParameter': sem(p.selfVar, fs.selfVar),
    'magicFunction': sem(p.func, 'italic'),
    'builtinConstant': p.number,
    'module': p.namespace,
  });

  SG('Rust (rust-analyzer) y C/C++ (clangd)', {
    'selfKeyword': sem(p.selfVar, fs.selfVar),
    'selfTypeKeyword': sem(p.type, fs.selfVar),
    'lifetime': sem(p.namespace, 'italic'),
    'builtinType': p.type,
    'typeAlias': p.type,
    'trait': sem(p.type, 'italic'),
    'attribute': sem(p.func, fs.decorator),
    'builtinAttribute': sem(p.func, fs.decorator),
    'formatSpecifier': p.escape,
    'escapeSequence': p.escape,
    'unresolvedReference': sem(p.errorSoft, 'underline'),
    'boolean': p.number,
    'character': p.number,
    'constParameter': sem(p.constant, 'italic'),
  });

  return { sections, tokens, semantic };
};
