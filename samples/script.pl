#!/usr/bin/perl
use strict;
use warnings;

my %totals = (enero => 1200.50, febrero => 980);
my @meses = sort keys %totals;

foreach my $mes (@meses) {
    printf "%-10s %8.2f\n", $mes, $totals{$mes};
}

while (my $line = <STDIN>) {
    chomp $line;
    print "NIT válido: $1\n" if $line =~ /^(\d{4}-\d{6}-\d{3}-\d)$/;
}
