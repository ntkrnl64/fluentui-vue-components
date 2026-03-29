<script setup lang="ts">
import { ref } from "vue";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  TableSelectionCell,
  TableCellLayout,
} from "../../index";
import ControlExample from "../ControlExample.vue";

interface FileItem {
  name: string;
  author: string;
  lastModified: string;
  size: string;
}

const items: FileItem[] = [
  {
    name: "Meeting notes.docx",
    author: "John Doe",
    lastModified: "Mar 15, 2026",
    size: "24 KB",
  },
  {
    name: "Budget.xlsx",
    author: "Jane Smith",
    lastModified: "Mar 10, 2026",
    size: "156 KB",
  },
  {
    name: "Presentation.pptx",
    author: "Alex Johnson",
    lastModified: "Mar 8, 2026",
    size: "2.3 MB",
  },
  {
    name: "Report.pdf",
    author: "Sam Wilson",
    lastModified: "Mar 5, 2026",
    size: "540 KB",
  },
];

const sortColumn = ref("");
const sortDirection = ref<"ascending" | "descending">("ascending");
const selectedRows = ref<Set<number>>(new Set());

function onSort(column: string) {
  if (sortColumn.value === column) {
    sortDirection.value =
      sortDirection.value === "ascending" ? "descending" : "ascending";
  } else {
    sortColumn.value = column;
    sortDirection.value = "ascending";
  }
}

function toggleRow(index: number) {
  const next = new Set(selectedRows.value);
  if (next.has(index)) {
    next.delete(index);
  } else {
    next.add(index);
  }
  selectedRows.value = next;
}

function toggleAll() {
  if (selectedRows.value.size === items.length) {
    selectedRows.value = new Set();
  } else {
    selectedRows.value = new Set(items.map((_, i) => i));
  }
}
</script>

<template>
  <div class="page">
    <h1>Table</h1>
    <p>
      Tables display data in rows and columns for easy comparison and analysis.
    </p>

    <ControlExample headerText="Basic Table">
      <div style="width: 100%">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>File</TableHeaderCell>
              <TableHeaderCell>Author</TableHeaderCell>
              <TableHeaderCell>Last Modified</TableHeaderCell>
              <TableHeaderCell>Size</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in items" :key="item.name">
              <TableCell
                ><TableCellLayout>{{ item.name }}</TableCellLayout></TableCell
              >
              <TableCell>{{ item.author }}</TableCell>
              <TableCell>{{ item.lastModified }}</TableCell>
              <TableCell>{{ item.size }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </ControlExample>

    <ControlExample headerText="Sortable Table">
      <div style="width: 100%">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell
                :sortDirection="
                  sortColumn === 'name' ? sortDirection : undefined
                "
                @click="onSort('name')"
                style="cursor: pointer"
                >File</TableHeaderCell
              >
              <TableHeaderCell
                :sortDirection="
                  sortColumn === 'author' ? sortDirection : undefined
                "
                @click="onSort('author')"
                style="cursor: pointer"
                >Author</TableHeaderCell
              >
              <TableHeaderCell>Last Modified</TableHeaderCell>
              <TableHeaderCell>Size</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in items" :key="item.name">
              <TableCell>{{ item.name }}</TableCell>
              <TableCell>{{ item.author }}</TableCell>
              <TableCell>{{ item.lastModified }}</TableCell>
              <TableCell>{{ item.size }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <template #output>
        <span>Sort: {{ sortColumn || "(none)" }} {{ sortDirection }}</span>
      </template>
    </ControlExample>

    <ControlExample headerText="Table with Selection">
      <div style="width: 100%">
        <Table>
          <TableHeader>
            <TableRow>
              <TableSelectionCell
                :checked="
                  selectedRows.size === items.length
                    ? true
                    : selectedRows.size > 0
                      ? 'mixed'
                      : false
                "
                @change="toggleAll"
              />
              <TableHeaderCell>File</TableHeaderCell>
              <TableHeaderCell>Author</TableHeaderCell>
              <TableHeaderCell>Size</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(item, index) in items" :key="item.name">
              <TableSelectionCell
                :checked="selectedRows.has(index)"
                @change="toggleRow(index)"
              />
              <TableCell>{{ item.name }}</TableCell>
              <TableCell>{{ item.author }}</TableCell>
              <TableCell>{{ item.size }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <template #output>
        <span>Selected: {{ selectedRows.size }} row(s)</span>
      </template>
    </ControlExample>
  </div>
</template>

<style scoped>
.page {
  max-width: 960px;
  margin: 0 auto;
}
.page h1 {
  color: var(--colorNeutralForeground1);
  margin-bottom: 4px;
}
.page > p {
  color: var(--colorNeutralForeground2);
  margin-bottom: 24px;
}
</style>
